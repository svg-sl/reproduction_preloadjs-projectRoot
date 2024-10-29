# Mirror of https://hub.docker.com/_/node
# FROM artifactory-dockerhub.cloud.capitalone.com/node:18
FROM node:18

WORKDIR /app

COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY ./package.json .

RUN npm install

## START OF SEALIGHTS IMPLEMENTATION - PLEASE DO NOT MODIFY ##

# COPY ["sltoken*", "buildSessionId*", "./"]
COPY ["sltoken*", "./"]
COPY ["buildSessionId*", "./"]
## END OF SEALIGHTS IMPLEMENTATION ##

EXPOSE 8080

ENV NODE_DEBUG=sl
ENV SL_LOG_LEVEL=debug
ENV SL_labId="local-testing"
ENV SL_projectRoot='.'


# Using preload
ENV NODE_OPTIONS="-r ./node_modules/slnodejs/lib/preload.js"
CMD ["node", "dist/bundle.js"]
