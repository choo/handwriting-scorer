#!/bin/sh

# NOTE: run this script on deploy container.
#       deploy container should have 'docker' command, 'npm' command

if [ $# -ne 1 ]; then
    echo "Usage:" 1>&2
    echo "  ${0}  IMAGE_NAME" 1>&2
    exit 1
fi

set -e

IMAGE_NAME=$1
TAG=`date '+%Y%m%d-%H%M'`
BASEDIR=$(cd $(dirname $0)/..; pwd)

# include common.sh
. ./common.sh

build_frontend

# build container image
cd ${BASEDIR}
docker build -t ${IMAGE_NAME} .
docker image tag ${IMAGE_NAME} ${IMAGE_NAME}:${TAG}
#docker image tag ${IMAGE_NAME} \
#                 ${IMAGE_REGISTRY}/${IMAGE_NAME}
#docker image tag ${IMAGE_NAME} \
#                 ${IMAGE_REGISTRY}/${IMAGE_NAME}:${TAG}

echo "\n"
echo "************************************************************"
echo "*** COMPLETED Building Image!"
echo "*** Run the following command to start container. "
echo "***   sudo docker run --rm -p {PORT}:{PORT} ${IMAGE_NAME}  "
echo "************************************************************"
