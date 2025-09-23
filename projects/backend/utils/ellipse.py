import numpy as np

# JSONシリアライズ可能に変換する関数
def to_serializable(obj):
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    if isinstance(obj, tuple):
        return [to_serializable(i) for i in obj]
    if isinstance(obj, dict):
        return {k: to_serializable(v) for k, v in obj.items()}
    return obj
import cv2
import numpy as np
from PIL import Image


# ① 楕円検出
def detect_ellipses(binary):
    contours1, hierarchy1 = cv2.findContours(binary.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours2, hierarchy2 = cv2.findContours(binary.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours3, hierarchy3 = cv2.findContours(binary.copy(), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    all_contours = list(contours1) + list(contours2) + list(contours3)
    h, w = binary.shape[:2]
    all_ellipses = []
    for i, contour in enumerate(all_contours):
        if len(contour) >= 5:
            try:
                ellipse = cv2.fitEllipse(contour)
                (center_x, center_y), (major_axis, minor_axis), angle = ellipse
                area = cv2.contourArea(contour)
                if area > 50 and major_axis > 10 and minor_axis > 5:
                    aspect_ratio = max(major_axis, minor_axis) / min(major_axis, minor_axis)
                    if aspect_ratio < 20:
                        ellipse_area = np.pi * (major_axis / 2) * (minor_axis / 2)
                        area_ratio = area / ellipse_area if ellipse_area > 0 else 0
                        all_ellipses.append({
                            "contour_index": i,
                            "center": (float(center_x), float(center_y)),
                            "major_axis": float(major_axis),
                            "minor_axis": float(minor_axis),
                            "angle": float(angle),
                            "area": float(area),
                            "aspect_ratio": float(aspect_ratio),
                            "area_ratio": float(area_ratio),
                            "contour": contour,
                            "ellipse": ellipse,
                            "hierarchy_info": None
                        })
            except:
                continue
    all_ellipses.sort(key=lambda x: x["area"], reverse=True)
    # 重複除去
    filtered_ellipses = []
    for ellipse in all_ellipses:
        is_duplicate = False
        for existing in filtered_ellipses:
            center_dist = np.sqrt((ellipse["center"][0] - existing["center"][0])**2 +
                                  (ellipse["center"][1] - existing["center"][1])**2)
            overlap_threshold = min(ellipse["minor_axis"], existing["minor_axis"]) * 0.1
            if center_dist < overlap_threshold and abs(ellipse["area"] - existing["area"]) < min(ellipse["area"], existing["area"]) * 0.3:
                is_duplicate = True
                break
        if not is_duplicate:
            filtered_ellipses.append(ellipse)
    return filtered_ellipses, h, w

# ② 楕円ラベリング・描画
def label_and_draw_ellipses(binary, filtered_ellipses, h, w):
    draw_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
    detected_ellipses = []
    targets = {"plate_outer": None, "plate_inner": None, "glass_top": None}
    center_x_threshold = w * 0.55
    left_ellipses = [e for e in filtered_ellipses if e["center"][0] < center_x_threshold]
    right_ellipses = [e for e in filtered_ellipses if e["center"][0] >= w * 0.45]
    # 皿の外側輪郭
    plate_outer_candidates = []
    for ellipse in left_ellipses:
        y_pos_ratio = ellipse["center"][1] / h
        x_pos_ratio = ellipse["center"][0] / w
        is_left_center = (0.2 < y_pos_ratio < 0.9) and (0.1 < x_pos_ratio < 0.7)
        is_large_enough = ellipse["area"] > 5000
        is_reasonable_ellipse = 1.1 < ellipse["aspect_ratio"] < 6
        if is_left_center and is_large_enough and is_reasonable_ellipse:
            plate_outer_candidates.append(ellipse)
    if plate_outer_candidates:
        plate_outer_candidates.sort(key=lambda x: x["area"], reverse=True)
        targets["plate_outer"] = plate_outer_candidates[0]
    # 皿の内側
    if targets["plate_outer"]:
        plate_inner_candidates = []
        outer_ellipse = targets["plate_outer"]["ellipse"]
        outer_center = targets["plate_outer"]["center"]
        for ellipse in filtered_ellipses:
            if ellipse["area"] < targets["plate_outer"]["area"]:
                center_x, center_y = ellipse["center"]
                ox, oy = outer_center
                oa, ob = targets["plate_outer"]["major_axis"] / 2, targets["plate_outer"]["minor_axis"] / 2
                angle_rad = np.radians(targets["plate_outer"]["angle"])
                cos_angle = np.cos(-angle_rad)
                sin_angle = np.sin(-angle_rad)
                dx = center_x - ox
                dy = center_y - oy
                x_rot = dx * cos_angle - dy * sin_angle
                y_rot = dx * sin_angle + dy * cos_angle
                ellipse_value = (x_rot / oa) ** 2 + (y_rot / ob) ** 2
                if ellipse_value < 1.2:
                    is_reasonable_ellipse = 1.05 < ellipse["aspect_ratio"] < 15
                    is_min_size = ellipse["area"] > 300
                    if is_reasonable_ellipse and is_min_size:
                        plate_inner_candidates.append(ellipse)
        if plate_inner_candidates:
            plate_inner_candidates.sort(key=lambda x: x["area"], reverse=True)
            targets["plate_inner"] = plate_inner_candidates[0]
        else:
            backup_candidates = []
            for ellipse in filtered_ellipses:
                if ellipse["area"] < targets["plate_outer"]["area"] * 0.9:
                    y_pos_ratio = ellipse["center"][1] / h
                    x_pos_ratio = ellipse["center"][0] / w
                    is_plate_area = (0.1 < y_pos_ratio < 0.9) and (0.05 < x_pos_ratio < 0.8)
                    is_reasonable_ellipse = 1.05 < ellipse["aspect_ratio"] < 15
                    is_min_size = ellipse["area"] > 200
                    if is_plate_area and is_reasonable_ellipse and is_min_size:
                        backup_candidates.append(ellipse)
            if backup_candidates:
                backup_candidates.sort(key=lambda x: x["area"], reverse=True)
                targets["plate_inner"] = backup_candidates[0]
    # グラスの飲み口
    glass_candidates = []
    for ellipse in filtered_ellipses:
        y_pos_ratio = ellipse["center"][1] / h
        x_pos_ratio = ellipse["center"][0] / w
        is_right_upper = (0.05 < y_pos_ratio < 0.6) and (0.5 < x_pos_ratio < 0.95)
        is_small_to_medium = 100 < ellipse["area"] < 5000
        is_elongated = ellipse["aspect_ratio"] > 1.5
        if is_right_upper and is_small_to_medium and is_elongated:
            circularity = min(ellipse["major_axis"], ellipse["minor_axis"]) / max(ellipse["major_axis"], ellipse["minor_axis"])
            if circularity < 0.8:
                glass_candidates.append(ellipse)
    if glass_candidates:
        glass_candidates.sort(key=lambda x: (x["center"][1], -x["aspect_ratio"]))
        targets["glass_top"] = glass_candidates[0]
    # 描画と返却用リスト
    colors = {"plate_outer": (0, 255, 0), "plate_inner": (255, 255, 0), "glass_top": (0, 0, 255)}
    for label, ellipse_data in targets.items():
        if ellipse_data is not None:
            color = colors[label]
            # OpenCV描画用（NumPy配列のまま）
            if isinstance(ellipse_data["contour"], list):
                contour_np = np.array(ellipse_data["contour"], dtype=np.int32)
            else:
                contour_np = ellipse_data["contour"]
            cv2.drawContours(draw_image, [contour_np], -1, color, 2)
            cv2.ellipse(draw_image, ellipse_data["ellipse"], color, 2)
            # 返却用（シリアライズ可能な形に変換）
            detected_ellipses.append({
                "label": label,
                "contour_index": ellipse_data["contour_index"],
                "center": to_serializable(ellipse_data["center"]),
                "major_axis": ellipse_data["major_axis"],
                "minor_axis": ellipse_data["minor_axis"],
                "angle": ellipse_data["angle"],
                "area": ellipse_data["area"],
                "aspect_ratio": ellipse_data.get("aspect_ratio"),
                "area_ratio": ellipse_data.get("area_ratio"),
                "contour": to_serializable(ellipse_data.get("contour")),
                "ellipse": to_serializable(ellipse_data.get("ellipse")),
                "hierarchy_info": to_serializable(ellipse_data.get("hierarchy_info"))
            })
    draw_image_rgb = cv2.cvtColor(draw_image, cv2.COLOR_BGR2RGB)
    edge_image = Image.fromarray(draw_image_rgb)
    return edge_image, detected_ellipses