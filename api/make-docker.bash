#!/bin/bash

npm run build

DOCKER_BUILDKIT=1 docker build --no-cache --ssh default=~/.ssh/readonly-github -t mkramers.io-api -f ./Dockerfile .