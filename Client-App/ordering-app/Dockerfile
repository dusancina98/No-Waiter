FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install -g expo-cli
RUN npm install

# add app
COPY . ./
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

# start app
CMD ["npm","run", "start"]