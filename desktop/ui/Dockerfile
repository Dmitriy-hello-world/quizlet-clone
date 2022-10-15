FROM node:alpine as BUILDER

WORKDIR /ui

RUN apk add python3 make g++

COPY public public
COPY src src
COPY etc etc
COPY webpackMods webpackMods
COPY package*.json ./
COPY .eslintrc .eslintrc
COPY .babelrc .babelrc
COPY webpack.config.js webpack.config.js

ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN npm ci
RUN npm run prod

FROM nginx:alpine

WORKDIR /ui

COPY etc/nginx.conf.sample /etc/nginx/conf.d/default.conf
COPY --from=BUILDER /ui/build /ui/build

CMD exec /usr/sbin/nginx -g 'daemon off;'
