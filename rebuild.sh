#!/bin/bash
export VERSION=v1.5

docker build . -t chg-recognition:$VERSION
docker stop chg-recognition
docker rm chg-recognition
./command.sh
