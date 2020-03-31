#!/bin/bash

KEY=~/scripts/keys/site.pem
HOSTNAME=ec2-3-20-251-84.us-east-2.compute.amazonaws.com
DESTINATION=/home/ubuntu/deploy

get_docker_export_filename() {
  local DOCKER_NAME=$1
  echo "$DOCKER_NAME.tar"
}

get_docker_export_path() {
  local DOCKER_NAME=$1
  DOCKER_EXPORT_FILENAME=$(get_docker_export_filename "$DOCKER_NAME")
  echo "./$DOCKER_EXPORT_FILENAME"
}

build_docker() {
  local DOCKER_NAME=$1
  DOCKER_EXPORT_PATH=$(get_docker_export_path "$DOCKER_NAME")

  npm run build

  #docker build -t $DOCKER_NAME .
  docker build -t "$DOCKER_NAME" . --no-cache
  docker save -o "$DOCKER_EXPORT_PATH" "$DOCKER_NAME"
}

push_container() {
  local DOCKER_NAME=$1
  DOCKER_EXPORT_FILENAME=$(get_docker_export_filename "$DOCKER_NAME")
  DOCKER_EXPORT_PATH=$(get_docker_export_path "$DOCKER_NAME")

  scp -i $KEY "$DOCKER_EXPORT_PATH" ubuntu@$HOSTNAME:$DESTINATION/
}

load_container() {
  local DOCKER_NAME=$1
  DOCKER_EXPORT_FILENAME=$(get_docker_export_filename "$DOCKER_NAME")
  DOCKER_EXPORT_PATH=$(get_docker_export_path "$DOCKER_NAME")

  ssh -i $KEY ubuntu@$HOSTNAME "docker load -i $DESTINATION/$DOCKER_EXPORT_FILENAME"
}

pushd ../api

DOCKER_NAME=mkramers-io-api

build_docker $DOCKER_NAME
push_container $DOCKER_NAME
load_container $DOCKER_NAME

popd

pushd ../site

DOCKER_NAME=mkramers-io-site

build_docker $DOCKER_NAME
push_container $DOCKER_NAME
load_container $DOCKER_NAME

popd

scp -i $KEY ./docker-compose.yml ubuntu@$HOSTNAME:$DESTINATION/