FROM node:alpine as BUILDER

WORKDIR /ui

RUN apk add git

# COPY bin bin
COPY public public
COPY src src
COPY etc etc
COPY package*.json ./

## increased memory heap for "npm run build" command
ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN npm ci
RUN npm run build

FROM nginx:alpine

WORKDIR /ui

COPY etc/nginx.conf.sample /etc/nginx/conf.d/default.conf
COPY --from=BUILDER /ui/build /ui/build

CMD exec /usr/sbin/nginx -g 'daemon off;'
