FROM node:16 as base

WORKDIR /usr/src/app

FROM base as test

COPY . .

RUN npm install

CMD CI=true npm test

FROM base as prod

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=prod /usr/src/app/build /usr/share/nginx/html