FROM node:7
WORKDIR /chat-app
COPY package.json /chat-app
RUN npm install
COPY . /chat-app
CMD node index.js
EXPOSE 3000
