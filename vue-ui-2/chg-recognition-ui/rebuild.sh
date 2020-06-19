#!/bin/bash
export VERSION=v1.0

docker build . -t chg-recognition-ui:$VERSION
docker stop chg-recognition-ui
docker rm chg-recognition-ui
./command.sh
