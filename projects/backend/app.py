from flask import Flask, request, send_file, jsonify
import os
from PIL import Image
import numpy as np
import io
from flask_cors import CORS
import cv2  # OpenCVをインポート
import cv2.ximgproc as ximgproc

app = Flask(__name__)
CORS(app)
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

    # メディアンフィルタでノイズ除去
    binary = cv2.medianBlur(binary, 3)
    # モルフォロジー処理でノイズ除去
    # kernel = np.ones((5,5),np.uint8)
    # Erosionで細い線を削除
    # binary = cv2.erode(binary, kernel, iterations=1)
    # #  Dilationで細い線を太くする
    # binary = cv2.dilate(binary, kernel, iterations=3)
    # Openingで白いノイズと細い線を削除
    #binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
    # Closingで白い領域の穴埋めと線の結合
    #binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)

    # 局所的二値化（適応的閾値処理）
    binary = cv2.adaptiveThreshold(
        binary,
        255,
        cv2.ADAPTIVE_THRESH_MEAN_C,#加重平均
        cv2.THRESH_BINARY,
        9,   # ブロックサイズ（奇数）
        -5    # 定数C（調整可能）
    )

    # 輪郭検出
    contours, hierarchy = cv2.findContours(binary.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    # 描画用のカラー画像を作成
    draw_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR) # 二値画像を背景にする場合
    # 輪郭を描画
    cv2.drawContours(draw_image, contours, -1, (0, 255, 0), 2) # 緑色で線幅2ピクセル
    
    # 描画した画像をPIL Imageに変換
    # OpenCVはBGR形式、PILはRGB形式なので変換が必要
    draw_image_rgb = cv2.cvtColor(draw_image, cv2.COLOR_BGR2RGB)
    edge_image = Image.fromarray(draw_image_rgb)

    img_io = io.BytesIO()# 画像をバイナリストリームに保存

    # 二値画像をPNG形式で保存を表示したい場合
    # edge_image = Image.fromarray(binary)

    edge_image.save(img_io, 'PNG')

    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')
    
@app.route('/reverse', methods=['POST'])
def drawing():
    file = request.files.get('file')
    filepath, error = validate_and_save_file(file, app.config['UPLOAD_FOLDER'])
    if error:
        return error
    image = Image.open(filepath).convert('L')
    image_np = np.array(image)
    edges = cv2.Canny(image_np, 5, 20)
    # 黒白反転
    inverted_edges = cv2.bitwise_not(edges)
    edge_image = Image.fromarray(inverted_edges)
    img_io = io.BytesIO()
    edge_image.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)