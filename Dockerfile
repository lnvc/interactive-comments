FROM node:16

WORKDIR /app

COPY package.json ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]
