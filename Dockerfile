FROM node:14-alpine

ENV NODE_ENV=production

RUN apk update && \
    apk add --no-cache curl bash python g++ make && \
    rm -rf /var/cache/apk/* && \
    curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci
RUN npm install pm2 -g

COPY . /app

# App
EXPOSE 3000

CMD ["pm2-runtime", "./bin/www"]
