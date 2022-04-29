FROM node:16.13.0

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

ENV NODE_ENV='production'

EXPOSE 5002

CMD [ "yarn", "docker-build-webapp" ]

