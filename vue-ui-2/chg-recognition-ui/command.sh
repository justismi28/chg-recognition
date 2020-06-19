#!/bin/bash
docker run --name chg-recognition-ui -p8778:8081 -d --restart always chg-recognition-ui:$VERSION
