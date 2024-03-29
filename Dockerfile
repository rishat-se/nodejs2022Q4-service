FROM node:18.12.1-alpine3.17
WORKDIR /usr/local/app
COPY package*.json .
RUN npm install && npm cache clean --force
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]
