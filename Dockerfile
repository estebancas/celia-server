FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Expose the port the app runs in
EXPOSE 3000

# npm run start:dev
CMD ["npm", "run", "start:dev"]
