FROM node:alpine

WORKDIR /app
COPY package.json .
# Make sure we don't install devDeps
RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]