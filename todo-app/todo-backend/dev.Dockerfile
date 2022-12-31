FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=playground:*

ENV PORT=80

USER node

CMD ["npm", "start"]