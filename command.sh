#!/bin/bash
export MONGO_URL="mongodb+srv://admin:UJ9VR5s3BaBz2zE5@cluster0-g3lzu.mongodb.net/test?retryWrites=true&w=majority"
echo "Running with MONGO_URL: $MONGO_URL"
docker run --name chg-recognition --env MONGO_URL -p8777:8081 -d --restart always chg-recognition:$VERSION
