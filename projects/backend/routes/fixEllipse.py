from flask import Blueprint, request, jsonify, current_app
from PIL import Image
import numpy as np
import io
import cv2
import base64
from utils.image_processing import validate_and_save_file, load_and_prepare_binary
from utils.ellipse import detect_ellipses, label_and_draw_ellipses

fixEllipse_bp = Blueprint('fixEllipse', __name__)

@fixEllipse_bp.route('/fixEllipse', methods=['POST'])
def fixEllipse():
    ellipses = request.json['ellipses']  # ここで配列を期待
    if not isinstance(ellipses, list):
        return jsonify(message='Invalid input'), 400
    binary = np.load('./static/binary_data/binary.npy')  # ここでbinaryを読み込み
    h, w = binary.shape[:2]
    edge_image, ellipses = label_and_draw_ellipses(binary, ellipses, h, w)

    img_io = io.BytesIO()
    edge_image.save(img_io, 'PNG')
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
    
    return jsonify({
        "image": img_base64,
        "ellipses": ellipses
    })