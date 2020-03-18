#!/bin/bash

DOCKER_NAME=mkramers-io-site
DOCKER_EXPORT_FILENAME=$DOCKER_NAME.tar
DOCKER_EXPORT_PATH=./$DOCKER_EXPORT_FILENAME

npm run build

#docker build -t $DOCKER_NAME .
docker build -t $DOCKER_NAME . --no-cache

docker save -o $DOCKER_EXPORT_PATH $DOCKER_NAME

KEY=~/scripts/keys/site.pem
HOSTNAME=ec2-3-20-251-84.us-east-2.compute.amazonaws.com

DESTINATION=/home/ubuntu/deploy

scp -i $KEY $DOCKER_EXPORT_PATH ubuntu@$HOSTNAME:$DESTINATION/

ssh -i $KEY ubuntu@$HOSTNAME "docker load -i $DESTINATION/$DOCKER_EXPORT_FILENAME"
