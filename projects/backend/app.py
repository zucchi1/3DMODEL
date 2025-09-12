from flask import Flask, request, send_file, jsonify
import os
from PIL import Image
import numpy as np
import io
from flask_cors import CORS
import cv2  # OpenCVをインポート
import cv2.ximgproc as ximgproc # 現在のコードでは未使用ですが、念のため保持
import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/')
def index():
    return 'Flask Server'
def binary_image_processing(binary, kernel_size=3,
                           adaptive_block_size=51, adaptive_C=15):
    # ノイズ除去
    binary = cv2.GaussianBlur(binary, (3, 3), 0)
    binary = cv2.medianBlur(binary, kernel_size)
    binary = cv2.adaptiveThreshold(
    binary, 255,
    cv2.ADAPTIVE_THRESH_MEAN_C,
    cv2.THRESH_BINARY,
    adaptive_block_size,
    adaptive_C
    )
    return binary
def remove_small_labels(binary, min_area=100):
    # 0:背景, 1以降:ラベル
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary)
    output = np.zeros_like(binary)
    for i in range(1, num_labels):  # 0は背景なので除外
        area = stats[i, cv2.CC_STAT_AREA]
        if area >= min_area:
            output[labels == i] = 255
    return output


def validate_and_save_file(file, upload_folder):
    """画像ファイルの検証と保存。失敗時はエラーレスポンスを返す。"""
    if not file:
        return None, (jsonify(message='No file part'), 400)
    if file.filename == '':
        return None, (jsonify(message='No selected file'), 400)
    try:
        image = Image.open(file)
        image.verify()
        file.seek(0)
    except (IOError, SyntaxError) as e:
        return None, (jsonify(message=f'Invalid image file: {e}'), 400)
    filepath = os.path.join(upload_folder, file.filename)
    file.save(filepath)
    return filepath, None
def detect_and_draw_ellipses(binary):
    """
    二値画像から輪郭検出・楕円フィッティングを行い、描画画像と楕円情報リストを返す
    """
    contours, hierarchy = cv2.findContours(binary.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    draw_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
    detected_ellipses = []

    for i, contour in enumerate(contours):
        if len(contour) >= 5:
            try:
                ellipse = cv2.fitEllipse(contour)
                (center_x, center_y), (major_axis_diameter, minor_axis_diameter), angle = ellipse
                cv2.drawContours(draw_image, [contour], -1, (0, 0, 255), 2)
                cv2.ellipse(draw_image, ellipse, (0, 0, 255), 2)
                detected_ellipses.append({
                    "contour_index": i,
                    "center": (float(center_x), float(center_y)),
                    "major_axis": float(major_axis_diameter),
                    "minor_axis": float(minor_axis_diameter),
                    "angle": float(angle),
                    "area": float(cv2.contourArea(contour))
                })
            except cv2.error:
                continue
            except Exception:
                continue

    draw_image_rgb = cv2.cvtColor(draw_image, cv2.COLOR_BGR2RGB)
    edge_image = Image.fromarray(draw_image_rgb)
    return edge_image, detected_ellipses

@app.route('/binary', methods=['POST'])
def binary_image():
    file = request.files.get('file')
    filepath, error = validate_and_save_file(file, app.config['UPLOAD_FOLDER'])
    if error:
        return error
    image = Image.open(filepath).convert('L')
    image.thumbnail((512, 512), Image.LANCZOS)
    binary = np.array(image)
    binary = cv2.medianBlur(binary, 1)  # ノイズ除去

    # 適応的閾値処理のパラメータを線画用に調整
    binary1 = binary_image_processing(binary, kernel_size=3, 
                                     adaptive_block_size=21,  # より小さく
                                     adaptive_C=8)  # より大きく

    # より優しいモルフォロジー処理（線の保持を重視）
    kernel_small = np.ones((2, 2), np.uint8)  # より小さいカーネル
    binary1 = cv2.morphologyEx(binary1, cv2.MORPH_CLOSE, kernel_small)  # CLOSEで線を接続

    # 輪郭描画を避けて、連結成分による小さいノイズ除去
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary1)
    cleaned = np.zeros_like(binary1)
    
    for i in range(1, num_labels):  # 0は背景なので除外
        area = stats[i, cv2.CC_STAT_AREA]
        if area > 10:  # 小さすぎるノイズを除去
            cleaned[labels == i] = 255
    
    binary1 = cleaned

    # 必要なら黒白反転
    binary1 = cv2.bitwise_not(binary1)
    edge_image = Image.fromarray(binary1)
    img_io = io.BytesIO()
    edge_image.save(img_io, 'PNG')
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')

    # 画像2もbase64で返す
    image_io2 = io.BytesIO()
    image2 = Image.fromarray(binary)
    image2.save(image_io2, 'PNG')
    image_io2.seek(0)
    img_base642 = base64.b64encode(image_io2.getvalue()).decode('utf-8')

    return jsonify({
        "image1": img_base64,
        "image2": img_base642
    })
    
@app.route('/reverse', methods=['POST'])
def drawing():
    file = request.files.get('file')
    filepath, error = validate_and_save_file(file, app.config['UPLOAD_FOLDER'])
    if error:
        return error
    image = Image.open(filepath).convert('L')
    image_np = np.array(image)
    edges = cv2.Canny(image_np, 5, 20)
    inverted_edges = cv2.bitwise_not(edges)
    edge_image = Image.fromarray(inverted_edges)
    img_io = io.BytesIO()
    edge_image.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

@app.route('/test', methods=['POST'])
def test():
    data = request.get_json()
    if not data or 'a' not in data or 'b' not in data:
        return jsonify(message='Invalid input'), 400
    a = data['a']
    b = data['b']
    result = int(a) + int(b)
    return jsonify(sum=result)

if __name__ == '__main__':
    app.run(debug=True)