FROM mhart/alpine-node:6

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY ./build .

FROM mhart/alpine-node:slim-13

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 4000

CMD ["node", "server.js"]