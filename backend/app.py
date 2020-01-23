#! /usr/bin/env python3
#-*- coding: utf-8 -*-

import os, argparse
from flask import Flask, jsonify, send_from_directory, request, make_response
from models.model import Model


ROOT_DIR = './build'
STATIC_DIR = os.path.join(ROOT_DIR, 'static')
app = Flask(__name__, static_folder=STATIC_DIR)

model = Model()
model.setup()

def _extract_uploaded_image():
    if 'uploadfile' not in request.files:
        return make_response(jsonify({'status':'err. uploadfile is required.'}))

    # <class 'werkzeug.datastructures.FileStorage'>
    uploaded = request.files['uploadfile']
    filename = uploaded.filename
    if not filename:
        return make_response(jsonify({
            'status':'error',
            'message': 'filename must not be empty.',
        }))
    return uploaded


''' API definitions '''

@app.route('/api/predict', methods=['POST'])
def predictResult():
    uploaded = _extract_uploaded_image()
    predicted = model.predict(uploaded)
    return make_response(jsonify({
        'status': 'ok',
        'predicted': predicted
    }))



''' static html '''

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return send_from_directory(ROOT_DIR, 'index.html')


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Flask web application server')
    parser.add_argument('--port', type=int, dest='port', required=False,
                        default=int(os.environ.get('PORT', 8080)), help='port number.')
    parser.add_argument('--is_dev', dest='is_dev', action='store_true',
                        help='running on dev mode or not')
    args = parser.parse_args()
    app.run(host='0.0.0.0', port=args.port, debug=args.is_dev)
