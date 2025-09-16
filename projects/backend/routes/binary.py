from flask import Blueprint, request, jsonify, current_app
from PIL import Image
import numpy as np
import io
import base64
import cv2
from utils.image_processing import binary_image_processing, validate_and_save_file

binary_bp = Blueprint('binary', __name__)

@binary_bp.route('/binary', methods=['POST'])
def binary_image():
    file = request.files.get('file')
    upload_folder = current_app.config['UPLOAD_FOLDER']
    filepath, error = validate_and_save_file(file, upload_folder)
    if error:
        return error
    image = Image.open(filepath).convert('L')
    image.thumbnail((512, 512), Image.LANCZOS)
    binary = np.array(image)
    binary = cv2.medianBlur(binary, 1)  # ノイズ除去

    # 適応的閾値処理のパラメータを線画用に調整
    binary1 = binary_image_processing(
        binary, kernel_size=3, adaptive_block_size=21, adaptive_C=8
    )

    # モルフォロジー処理（線の保持を重視）
    kernel_small = np.ones((2, 2), np.uint8)
    binary1 = cv2.morphologyEx(binary1, cv2.MORPH_CLOSE, kernel_small)

    # 小さいノイズ除去（ラベリング）
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary1)
    cleaned = np.zeros_like(binary1)
    for i in range(1, num_labels):  # 0は背景
        area = stats[i, cv2.CC_STAT_AREA]
        if area > 10:
            cleaned[labels == i] = 255
    binary1 = cleaned

    

    # 画像1: 二値化・ノイズ除去済み画像
    edge_image = Image.fromarray(binary1)
    img_io = io.BytesIO()
    edge_image.save(img_io, 'PNG')
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')

    # 画像2: 前処理（ノイズ除去のみ）画像
    image_io2 = io.BytesIO()
    image2 = Image.fromarray(binary)
    image2.save(image_io2, 'PNG')
    image_io2.seek(0)
    img_base642 = base64.b64encode(image_io2.getvalue()).decode('utf-8')

    return jsonify({
        "image1": img_base64,
        "image2": img_base642
    })