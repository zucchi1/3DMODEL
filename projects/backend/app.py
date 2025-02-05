from flask import Flask, request, send_file, jsonify
import os
from PIL import Image
import numpy as np
import io
from flask_cors import CORS
import cv2  # OpenCVをインポート

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/')
def index():
    return 'Flask Server'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(message='No file part'), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(message='No selected file'), 400
    if file:
        try:
            # 画像を開いて確認
            image = Image.open(file)
            image.verify()  # 画像が有効かどうかを確認
            file.seek(0)  # ファイルポインタをリセット
        except (IOError, SyntaxError) as e:
            return jsonify(message=f'Invalid image file: {e}'), 400

        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        # 画像処理（Canny法によるエッジ検出）
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
    app.run(host='0.0.0.0', debug=True)  # ここを変更