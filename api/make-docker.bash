#!/bin/bash

IMAGE_NAME=mkramers.io-api
OUTPUT_IMAGE_FILE_PATH=./$IMAGE_NAME.tar

npm run build

DOCKER_BUILDKIT=1 docker build --no-cache --ssh default=~/.ssh/readonly-github -t $IMAGE_NAME -f ./Dockerfile .