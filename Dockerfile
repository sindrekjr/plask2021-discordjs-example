FROM node:lts-alpine

WORKDIR /plask-bot
COPY . .
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
