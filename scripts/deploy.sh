#!/bin/sh

if [ $# -ne 2 ]; then
    echo "Usage:" 1>&2
    echo "  ${0}  IMAGE_NAME  IMAGE_REGISTRY" 1>&2
    exit 1
fi

set -e

# run container as 'Docker outside of Docker'(dood) container.
# that can execute docker command in the container.

IMAGE_NAME=$1
IMAGE_REGISTRY=$2
BASEDIR=$(cd $(dirname $0)/..; pwd)
TAG=`date '+%Y%m%d-%H%M'`
DEPLOY_CONTAINER_IMAGE=dev # conainer image name for deployment (CI server)

## if the platform of container is the same as the host
sudo docker run -it --rm \
    -v ${BASEDIR}:${BASEDIR} \
    -v /usr/bin/docker:/usr/bin/docker \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -w ${PWD} \
    ${DEPLOY_CONTAINER_IMAGE} \
    ${PWD}/build_docker_image.sh ${IMAGE_NAME}

# # if docker command fails to execute in cotainer,
# # download docker commands without docker engine as follows
# # cf.) https://github.com/moby/moby/issues/15360
# URL=https://get.docker.com/builds/Linux/x86_64/docker-client-1.13.1.tgz
# RUN curl -L ${URL} | tar -xz -C /usr/local/bin

docker image tag ${IMAGE_NAME} ${IMAGE_NAME}:${TAG}
docker image tag ${IMAGE_NAME} \
                 ${IMAGE_REGISTRY}/${IMAGE_NAME}
docker image tag ${IMAGE_NAME} \
                 ${IMAGE_REGISTRY}/${IMAGE_NAME}:${TAG}
docker push ${IMAGE_REGISTRY}/${IMAGE_NAME}

echo "\n"
echo "************************************************************"
echo "*** COMPLETED push docker image!"
echo "*** Run the following command to start container. "
echo "***   sudo docker run --rm -p {PORT}:{PORT} ${IMAGE_NAME}  "
echo "************************************************************"
