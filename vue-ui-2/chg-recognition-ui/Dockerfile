FROM node:buster

RUN npm install -g http-server
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8081
CMD [ "http-server", "dist" ]
