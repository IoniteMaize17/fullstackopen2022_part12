FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=playground:*

RUN npm i -g -y pm2

RUN pm2 start bin/www

RUN pm2 save

RUN pm2 startup systemd