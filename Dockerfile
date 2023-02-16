FROM node:18.12.1-alpine3.17
WORKDIR /usr/local/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]