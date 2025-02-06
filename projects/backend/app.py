from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from PIL import Image, UnidentifiedImageError
import numpy as np
import cv2
import io
from logging_config import setup_logging

app = Flask(__name__)
CORS(app)

# ログ設定の初期化
logger = setup_logging()

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# uploadsディレクトリが存在しない場合に作成
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    logger.info('Index page accessed')
    return 'Flask Server'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        logger.error('No file part in the request')
        return jsonify(message='No file part'), 400
    file = request.files['file']
    if file.filename == '':
        logger.error('No selected file')
        return jsonify(message='No selected file'), 400
    if file:
        try:
            # 画像を開いて確認
            image = Image.open(file)
            image.verify()  # 画像が有効かどうかを確認
            file.seek(0)  # ファイルポインタをリセット
        except (IOError, SyntaxError, UnidentifiedImageError) as e:
            logger.error(f'Invalid image file: {e}')
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
        logger.info('Image processed and sent back')
        return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)