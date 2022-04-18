FROM node:16.4.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "distributeFivePercent.js"]