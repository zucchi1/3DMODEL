import cv2
import numpy as np
from PIL import Image

def detect_and_draw_ellipses(binary):
    contours, hierarchy = cv2.findContours(binary.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    draw_image = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
    detected_ellipses = []
    temp_ellipses = []
    for i, contour in enumerate(contours):
        if len(contour) >= 5:
            try:
                ellipse = cv2.fitEllipse(contour)
                (center_x, center_y), (major_axis, minor_axis), angle = ellipse
                area = cv2.contourArea(contour)
                if area > 100 and major_axis > 50 and minor_axis > 20:
                    aspect_ratio = max(major_axis, minor_axis) / min(major_axis, minor_axis)
                    if aspect_ratio < 5:
                        ellipse_area = np.pi * (major_axis / 2) * (minor_axis / 2)
                        area_ratio = area / ellipse_area
                        if 1:
                            temp_ellipses.append({
                                "contour_index": i,
                                "center": (float(center_x), float(center_y)),
                                "major_axis": float(major_axis),
                                "minor_axis": float(minor_axis),
                                "angle": float(angle),
                                "area": float(area),
                                "aspect_ratio": float(aspect_ratio),
                                "area_ratio": float(area_ratio),
                                "contour": contour,
                                "ellipse": ellipse
                            })
            except cv2.error:
                continue
            except Exception:
                continue
    temp_ellipses.sort(key=lambda x: x["area"], reverse=True)
    filtered_ellipses = []
    for ellipse in temp_ellipses:
        is_duplicate = False
        for existing in filtered_ellipses:
            center_dist = np.sqrt((ellipse["center"][0] - existing["center"][0])**2 +
                                  (ellipse["center"][1] - existing["center"][1])**2)
            if center_dist < min(ellipse["major_axis"], ellipse["minor_axis"]) * 0.5:
                is_duplicate = True
                break
        if not is_duplicate:
            filtered_ellipses.append(ellipse)
    filtered_ellipses = filtered_ellipses[:10]
    for ellipse_data in filtered_ellipses:
        cv2.drawContours(draw_image, [ellipse_data["contour"]], -1, (0, 0, 255), 2)
        cv2.ellipse(draw_image, ellipse_data["ellipse"], (0, 0, 255), 2)
        detected_ellipses.append({
            "contour_index": ellipse_data["contour_index"],
            "center": ellipse_data["center"],
            "major_axis": ellipse_data["major_axis"],
            "minor_axis": ellipse_data["minor_axis"],
            "angle": ellipse_data["angle"],
            "area": ellipse_data["area"]
        })
    draw_image_rgb = cv2.cvtColor(draw_image, cv2.COLOR_BGR2RGB)
    edge_image = Image.fromarray(draw_image_rgb)
    return edge_image, detected_ellipses