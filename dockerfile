FROM node:16.16.0-alpine3.16

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm -g config set registry http://registry.npmjs.org/
RUN npm -g config set strict-ssl false

WORKDIR src/app
COPY package*.json ./

USER root
RUN apk add libreoffice
RUN apk add libreoffice-writer
RUN apk add libreoffice-calc
RUN apk add libreoffice-impress
RUN apk add fontconfig

RUN mkdir -p /usr/share/fonts
COPY src/app/fonts/* /usr/share/fonts/
RUN fc-cache -f -v

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.js" ]