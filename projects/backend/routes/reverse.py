# 将来的にここにファイル分割して機能ごとに分ける
from flask import Blueprint, request, send_file, current_app
from PIL import Image
import numpy as np
import cv2
import io
from utils.image_processing import validate_and_save_file

reverse_bp = Blueprint('reverse', __name__)

@reverse_bp.route('/reverse', methods=['POST'])
def drawing():
    file = request.files.get('file')
    upload_folder = current_app.config['UPLOAD_FOLDER']
    filepath, error = validate_and_save_file(file, upload_folder)
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