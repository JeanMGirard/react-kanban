FROM node:12-alpine
EXPOSE 9009

RUN mkdir -p /srv/lib
WORKDIR /srv/lib

COPY package.json /srv/lib/package.json
COPY package-lock.json /srv/lib/package-lock.json

RUN npm install

COPY . /srv/lib

CMD [ "npm", "run", "storybook" ]
