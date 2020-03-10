#!/bin/sh
set -e

BASEDIR=$(cd $(dirname $0)/..; pwd)
cd $BASEDIR/frontend
#npm install
npm run build

rm -rf $BASEDIR/backend/static || true # ignore dir not found error
mv build $BASEDIR/backend/static
