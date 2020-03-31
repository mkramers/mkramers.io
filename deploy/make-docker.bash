#!/bin/bash

KEY=~/scripts/keys/site.pem
HOSTNAME=ec2-3-20-251-84.us-east-2.compute.amazonaws.com
DESTINATION=/home/ubuntu/deploy

OUTPUT_DIR=$(dirname "$(readlink -f "$0")")

get_docker_export_filename() {
  local DOCKER_NAME=$1
  echo "$DOCKER_NAME.tar"
}

get_docker_export_path() {
  local DOCKER_NAME=$1
  local DOCKER_EXPORT_FILENAME=$(get_docker_export_filename "$DOCKER_NAME")
  echo "$OUTPUT_DIR/$DOCKER_EXPORT_FILENAME"
}

build_docker() {
  local DOCKER_NAME=$1
  local WORKING_DIR=$2

  local DOCKER_EXPORT_PATH=$(get_docker_export_path "$DOCKER_NAME")

  pushd "$WORKING_DIR"

  npm run build

  #docker build -t $DOCKER_NAME .
  docker build -t "$DOCKER_NAME" . --no-cache
  docker save -o "$DOCKER_EXPORT_PATH" "$DOCKER_NAME"

  popd
}

push_container() {
  local DOCKER_NAME=$1
  local DOCKER_EXPORT_FILENAME=$(get_docker_export_filename "$DOCKER_NAME")
  local DOCKER_EXPORT_PATH=$(get_docker_export_path "$DOCKER_NAME")

  scp -i $KEY "$DOCKER_EXPORT_PATH" ubuntu@$HOSTNAME:$DESTINATION/
}

load_container() {
  local DOCKER_NAME=$1
  local DOCKER_EXPORT_FILENAME=$(get_docker_export_filename "$DOCKER_NAME")
  local DOCKER_EXPORT_PATH=$(get_docker_export_path "$DOCKER_NAME")

  ssh -i $KEY ubuntu@$HOSTNAME "docker load -i $DESTINATION/$DOCKER_EXPORT_FILENAME"
}


DOCKER_NAME=mkramers-io-api

build_docker $DOCKER_NAME ../api
push_container $DOCKER_NAME
load_container $DOCKER_NAME

DOCKER_NAME=mkramers-io-site

build_docker $DOCKER_NAME ../site
push_container $DOCKER_NAME
load_container $DOCKER_NAME

scp -i $KEY ./docker-compose.yml ubuntu@$HOSTNAME:$DESTINATION/