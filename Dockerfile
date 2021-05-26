FROM node:14

WORKDIR /app

COPY . /app

RUN yarn install --frozen-lockfile

RUN yarn run build:production

CMD node ./dist/main.js

EXPOSE $PORT
