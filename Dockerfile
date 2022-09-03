From node:14.18-alpine3.12 as build-stage

RUN apk update && apk add build-base autoconf nasm lcms2-dev automake make bash

RUN addgroup -g 10000 app && \
    adduser -D -u 10000 -G app app -s /bin/sh

USER app

ARG environment

ARG node_env

ENV APP_ROOT=/home/app/app ENVIRONMENT=$environment NODE_OPTIONS=--max_old_space_size=4096

RUN mkdir -p $APP_ROOT && mkdir -p $APP_ROOT/log

WORKDIR $APP_ROOT

COPY --chown=app:app package.json package-lock.json ./

RUN yarn install && yarn cache clean

COPY --chown=app:app . ./

ENV NODE_ENV=$node_env

RUN echo "Bulding with ENVIRONMENT: $ENVIRONMENT NODE_ENV: $NODE_ENV"

RUN sh build.sh

FROM nginx:alpine

ENV APP_ROOT=/home/app/app

RUN mkdir -p $APP_ROOT

WORKDIR $APP_ROOT

RUN mkdir log

COPY ./config/containers/nginx/mysite.template /tmp/containers.nginx

RUN envsubst '$APP_ROOT' < /tmp/containers.nginx > /etc/nginx/conf.d/default.conf

COPY --from=build-stage /home/app/app/build/ /home/app/app/public/

CMD [ "nginx", "-g", "daemon off;" ]
