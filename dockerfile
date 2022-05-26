# https://mherman.org/blog/dockerizing-a-react-app/
# pull official base image
FROM node:current-alpine3.14

# set working directory
WORKDIR /api

# add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm i 
# add app
COPY ./ /api

EXPOSE 4000

# start app
CMD ["npm", "start"]
