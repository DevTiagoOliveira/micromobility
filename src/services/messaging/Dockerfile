FROM node:slim
WORKDIR /app
COPY package*.json /app/
RUN npm ci --only=production --silent
COPY . /app
CMD [ "npm", "start" ]