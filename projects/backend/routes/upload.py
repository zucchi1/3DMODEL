from flask import Blueprint, request, jsonify, current_app
from PIL import Image
import numpy as np
import io
import cv2
import base64
from utils.image_processing import validate_and_save_file
from utils.ellipse import detect_and_draw_ellipses

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_image():
    file = request.files.get('file')
    upload_folder = current_app.config['UPLOAD_FOLDER']
    filepath, error = validate_and_save_file(file, upload_folder)
    if error:
        return error
    image = Image.open(filepath).convert('L')
    image.thumbnail((512, 512), Image.LANCZOS)
    binary = np.array(image)
    binary = cv2.bitwise_not(binary)  # 白黒反転
    edge_image, ellipses = detect_and_draw_ellipses(binary)
    img_io = io.BytesIO()
    edge_image.save(img_io, 'PNG')
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
    return jsonify({
        "image": img_base64,
        "ellipses": ellipses
    })