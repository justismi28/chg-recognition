#!/bin/bash
export OKTA_ISSUER_URL="https://chghealthcare.oktapreview.com/oauth2/auskmtjacfEi8ffM60h7"
export OKTA_CLIENT_ID="0oas5s11wsNsbTO0M0h7"
export MONGO_URL="mongodb+srv://admin:UJ9VR5s3BaBz2zE5@cluster0-g3lzu.mongodb.net/test?retryWrites=true&w=majority"
echo "Running with MONGO_URL: $MONGO_URL"
docker run --name chg-recognition --env MONGO_URL --env OKTA_ISSUER_URL --env OKTA_CLIENT_ID -p8777:8081 -d --restart always chg-recognition:$VERSION
