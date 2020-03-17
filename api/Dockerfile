FROM node:13-alpine

USER node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json package-lock.json ./

USER node

RUN npm install

COPY ./build .

EXPOSE 4000

CMD ["node", "server.js"]