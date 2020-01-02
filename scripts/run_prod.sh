#!/bin/sh
set -ex

BASEDIR=$(cd $(dirname $0)/..; pwd)

# include common.sh
. $BASEDIR/scripts/common.sh

build_frontend
python3 $BASEDIR/backend/app.py --port 8888
