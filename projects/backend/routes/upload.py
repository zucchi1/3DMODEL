from flask import Blueprint, request, jsonify, current_app
from PIL import Image
import numpy as np
import os
import io
import cv2
import base64
from utils.image_processing import validate_and_save_file, load_and_prepare_binary
from utils.ellipse import detect_ellipses, label_and_draw_ellipses

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_image():
    file = request.files.get('file')
    upload_folder = current_app.config['UPLOAD_FOLDER']
    filepath, error = validate_and_save_file(file, upload_folder)
    if error:
        return error
    
    binary = load_and_prepare_binary(filepath, invert=True)
    save_dir = './static/binary_data'
    os.makedirs(save_dir, exist_ok=True)
    np.save(os.path.join(save_dir, 'binary.npy'), binary)
    filtered_ellipses, h, w = detect_ellipses(binary)
    edge_image, ellipses = label_and_draw_ellipses(binary, filtered_ellipses, h, w)
    
    img_io = io.BytesIO()
    edge_image.save(img_io, 'PNG')
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
    
    return jsonify({
        "image": img_base64,
        "ellipses": ellipses
    })