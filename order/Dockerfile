FROM node:alpine
WORKDIR /usr/src/app/order
COPY . /usr/src/app/order/
RUN npm install
# CMD ["./wait-for-it.sh"]
CMD ["npm","run","dev"]
EXPOSE 5002

