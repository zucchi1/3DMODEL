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

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    filepath, error = validate_and_save_file(file, app.config['UPLOAD_FOLDER'])
    if error:
        return error
    image = Image.open(filepath).convert('L')
    image.thumbnail((512, 512), Image.LANCZOS)  # 縦横比を保って最大512x512にリサイズ
    binary = np.array(image)
    binary= cv2.bitwise_not(binary)  # 黒白反転

    # メディアンフィルタでノイズ除去 (グレースケール画像に適用)
    binary = cv2.medianBlur(binary, 3) # ksize=3
    binary = cv2.Canny(binary, 50, 70)  # Cannyエッジ検出

    # 局所的二値化（適応的閾値処理）
    binary = cv2.adaptiveThreshold(
        binary, # 前処理されたグレースケール画像が入力
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        9,    # ブロックサイズ（奇数）
        -5    # 定数C（調整可能）
    )
    kernel = np.ones((3, 3), np.uint8)
    binary = cv2.dilate(binary, kernel, iterations=3)
    # 輪郭検出と楕円フィッティング
    edge_image, detected_ellipses = detect_and_draw_ellipses(binary)


    img_io = io.BytesIO()

    # 二値画像をPNG形式で保存を表示したい場合、以下のコメントアウトを外す
    # edge_image = Image.fromarray(binary)
    edge_image.save(img_io, 'PNG')

    img_io.seek(0)
     # 画像をbase64に変換
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')

    # JSONで楕円情報と画像データを返す
    return jsonify({
        "ellipses": detected_ellipses,
        "image": img_base64
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