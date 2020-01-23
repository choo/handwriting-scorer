#! /usr/bin/env python3
#-*- coding: utf-8 -*-

import os, argparse, datetime, secrets
from flask import Flask, jsonify, send_from_directory, request, make_response
from models.model import Model


SESSION_COOKIE = '__uid'
ROOT_DIR = './build'
STATIC_DIR = os.path.join(ROOT_DIR, 'static')
app = Flask(__name__, static_folder=STATIC_DIR)

model = Model()
model.setup()


def _make_token(num_bytes=16):
    """
    Creates a cryptographically-secure, URL-safe string (for Python 3.6+)
    """
    return secrets.token_urlsafe(num_bytes)


def _get_session_id(cookie_name):
    if cookie_name in request.cookies:
        session_id = request.cookies.get(cookie_name)
    else:
        session_id = _make_token()
    return session_id


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
    session_id = _get_session_id(SESSION_COOKIE)
    res = send_from_directory(ROOT_DIR, 'index.html')

    max_age = 60 * 60 * 24 * 365 * 50 # appox.) 50 years
    expires = int(datetime.datetime.now().timestamp()) + max_age
    res.set_cookie(SESSION_COOKIE, value=session_id,
            max_age=max_age, expires=expires, path='/',)

    return res


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Flask web application server')
    parser.add_argument('--port', type=int, dest='port', required=False,
                        default=int(os.environ.get('PORT', 8080)), help='port number.')
    parser.add_argument('--is_dev', dest='is_dev', action='store_true',
                        help='running on dev mode or not')
    args = parser.parse_args()
    app.run(host='0.0.0.0', port=args.port, debug=args.is_dev)
