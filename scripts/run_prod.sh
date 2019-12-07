#!/bin/sh
set -ex

# include common.sh
. ./common.sh

build_frontend
python3 $BASEDIR/backend/app.py --port 8888
