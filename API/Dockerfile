FROM node:12.18.2-alpine
WORKDIR /api_app
COPY package.json /api_app
RUN npm install
COPY . /api_app
CMD ["npm", "start"]