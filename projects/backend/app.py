from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['UPLOAD_FOLDER'] = 'static/uploads'

import os
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# ルートの登録
from routes.binary import binary_bp
from routes.upload import upload_bp
from routes.reverse import reverse_bp
from routes.test import test_bp

app.register_blueprint(binary_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(reverse_bp)
app.register_blueprint(test_bp)

@app.route('/')
def index():
    return 'Flask Server'

if __name__ == '__main__':
    app.run(debug=True)