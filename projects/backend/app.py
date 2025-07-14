from flask import Flask, request, send_file, jsonify
import os
from PIL import Image
import numpy as np
import io
from flask_cors import CORS
import cv2  # OpenCVをインポート
import cv2.ximgproc as ximgproc # 現在のコードでは未使用ですが、念のため保持

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

    # メディアンフィルタでノイズ除去 (グレースケール画像に適用)
    binary = cv2.medianBlur(binary, 3) # ksize=3

    # (モルフォロジー処理は現在コメントアウトされているため省略)

    # 局所的二値化（適応的閾値処理）
    binary = cv2.adaptiveThreshold(
        binary, # 前処理されたグレースケール画像が入力
        255,
        cv2.ADAPTIVE_THRESH_MEAN_C, # 加重平均から平均に変更
        cv2.THRESH_BINARY,
        9,    # ブロックサイズ（奇数）
        -5    # 定数C（調整可能）
    )

    # --- ここから輪郭検出とフィルタリング、楕円フィッティングの追加 ---

        # 輪郭検出
    # cv2.RETR_LIST は全ての輪郭を検出するので、まずはこれを使う
    contours, hierarchy = cv2.findContours(binary.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    # 描画用のカラー画像を準備
    draw_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)

    detected_ellipses = [] # 検出された楕円の情報を格納するリスト

    # 各輪郭をループしてフィルタリングと楕円フィッティングを行う
    for i, contour in enumerate(contours):
        # --- フィルタリングを一時的に緩める/削除 ---

        # 面積によるフィルタリングを一時的に削除
        # area = cv2.contourArea(contour)
        # if area < 500 or area > (512 * 512 * 0.8): # 例: 500ピクセル未満、画像の80%以上の面積は除外
        #     continue

        # 楕円フィッティングの試行
        if len(contour) >= 5: # 楕円フィッティングには最低5点が必要
            try:
                ellipse = cv2.fitEllipse(contour)
                (center_x, center_y), (major_axis_diameter, minor_axis_diameter), angle = ellipse

                # アスペクト比によるフィルタリングを一時的に削除
                # if minor_axis_diameter == 0:
                #     continue
                # aspect_ratio = major_axis_diameter / minor_axis_diameter
                # if aspect_ratio < 1.2 or aspect_ratio > 5.0: # この範囲はデッサンによって調整が必要
                #     continue

                # 楕円のサイズによるフィルタリングを一時的に削除
                # if major_axis_diameter < 50 or major_axis_diameter > 400: # 適当な例
                #     continue
                
                # フィルタを通過した輪郭を赤色で描画
                # (0, 0, 255) は赤色です。以前のコードでは青色になっていましたが、ここでは視認性向上のため赤に統一。
                cv2.drawContours(draw_image, [contour], -1, (0, 0, 255), 2) # 元の輪郭を赤色で描画
                cv2.ellipse(draw_image, ellipse, (0, 0, 255), 2) # フィッティング楕円を赤色で描画

                # 検出された楕円の情報を保存（フィルタリングが機能しているか確認用）
                detected_ellipses.append({
                    "contour_index": i,
                    "center": (float(center_x), float(center_y)),
                    "major_axis": float(major_axis_diameter),
                    "minor_axis": float(minor_axis_diameter),
                    "angle": float(angle),
                    # "aspect_ratio": float(aspect_ratio), # フィルタ削除したのでコメントアウト
                    "area": float(cv2.contourArea(contour)) # areaは常に計算しておく
                })

            except cv2.error as e:
                # fitEllipseが失敗した場合
                # print(f"Warning: Could not fit ellipse to contour {i}. Error: {e}")
                continue
            except Exception as e:
                # その他のエラー
                # print(f"An unexpected error occurred for contour {i}: {e}")
                continue
    # 描画した画像をPIL Imageに変換
    draw_image_rgb = cv2.cvtColor(draw_image, cv2.COLOR_BGR2RGB)
    edge_image = Image.fromarray(draw_image_rgb)

    img_io = io.BytesIO()

    # 二値画像をPNG形式で保存を表示したい場合、以下のコメントアウトを外す
    # edge_image = Image.fromarray(binary)
    edge_image.save(img_io, 'PNG')

    img_io.seek(0)

    # 検出された楕円の情報をJSONとして返すことも検討
    # return jsonify(ellipses=detected_ellipses, image=base64_encoded_image) # 画像とデータを一緒に返す場合
    
    # 今回は輪郭描画画像のみを返す
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