FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY . .
COPY package.json .
COPY ecosystem.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose the listening port of your app
EXPOSE 8000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
