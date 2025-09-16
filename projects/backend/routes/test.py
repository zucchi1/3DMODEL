from flask import Blueprint, request, jsonify

test_bp = Blueprint('test', __name__)

@test_bp.route('/test', methods=['POST'])
def test():
    data = request.get_json()
    if not data or 'a' not in data or 'b' not in data:
        return jsonify(message='Invalid input'), 400
    a = data['a']
    b = data['b']
    result = int(a) + int(b)
    return jsonify(sum=result)