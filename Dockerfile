FROM node:buster
MAINTAINER Curtis Porter

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]
