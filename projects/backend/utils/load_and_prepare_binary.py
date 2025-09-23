from PIL import Image
import numpy as np
import cv2

def load_and_prepare_binary(filepath, size=(512, 512), invert=False):
    image = Image.open(filepath).convert('L')
    image.thumbnail(size, Image.LANCZOS)
    binary = np.array(image)
    if invert:
        binary = cv2.bitwise_not(binary)  # 白黒反転
    return binary