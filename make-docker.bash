#!/bin/bash

pushd ./api
./make-docker.bash
popd

pushd ./site
./make-docker.bash
popd

KEY=~/scripts/keys/site.pem
HOSTNAME=ec2-3-20-251-84.us-east-2.compute.amazonaws.com
DESTINATION=/home/ubuntu/deploy

scp -i $KEY ./docker-compose.yml ubuntu@$HOSTNAME:$DESTINATION/