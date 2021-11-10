FROM node:14
WORKDIR /usr/src/app
RUN  npm install
COPY package.json ./
run ls
COPY . .
RUN ls
EXPOSE 3000
CMD ["node","src/index.js"]
