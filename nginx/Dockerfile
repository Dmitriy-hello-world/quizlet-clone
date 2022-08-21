FROM nginx:stable-alpine

RUN apk update && apk add tzdata bash

RUN rm /etc/nginx/conf.d/default.conf

COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./config/robots.txt /etc/nginx/robots.txt

CMD [ "nginx", "-g", "daemon off;" ]