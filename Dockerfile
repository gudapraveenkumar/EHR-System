# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./package.json
COPY public ./public
COPY src ./src

# install and cache app dependencies
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app
CMD [ "npm", "run", "start" ]
