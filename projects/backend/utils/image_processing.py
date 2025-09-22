import cv2
import numpy as np
from PIL import Image
from flask import jsonify
import os
# 画像処理の関数群
def binary_image_processing(binary, kernel_size=3, adaptive_block_size=51, adaptive_C=15):
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
    # 二値画像から小さいラベル（領域）を除去する関数
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary)
    output = np.zeros_like(binary)
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        if area >= min_area:
            output[labels == i] = 255
    return output

def validate_and_save_file(file, upload_folder):
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