#!/bin/sh
set -ex

BASEDIR=$(cd $(dirname $0)/..; pwd)

python3 $BASEDIR/backend/app.py --port 8080 --is_dev &

cd $BASEDIR/frontend
npm install
npm run start &
