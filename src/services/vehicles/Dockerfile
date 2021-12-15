FROM node:slim
ENV NODE_ENV = production
WORKDIR /app
COPY package*.json /app/
RUN npm ci --only=production --silent
COPY . /app
CMD [ "npm", "start" ]