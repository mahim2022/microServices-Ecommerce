FROM node:alpine
WORKDIR /usr/src/app/product
COPY . /usr/src/app/product/
RUN npm install
# CMD ["./wait-for-it.sh"]
CMD ["npm","run","dev"]
EXPOSE 5000


