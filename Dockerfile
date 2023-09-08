#Pulling base image
FROM node:16-alpine

WORKDIR /usr/src/app/

#Installing dependencies
COPY package*.json ./
COPY yarn.lock ./

COPY . .

RUN yarn install
RUN yarn global add prisma

# RUN yarn prisma generate
EXPOSE 4000

CMD [ "yarn", "start" ]
