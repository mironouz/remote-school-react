[![CircleCI](https://circleci.com/gh/mironouz/remote-school-react.svg?style=svg)](https://circleci.com/gh/mironouz/remote-school-react)

## React frontend for [remote school api](https://github.com/mironouz/remote-school-api)

Can be checked online at https://mironouz.xyz

## Local start:

The preferred way to start the application locally is to use the docker-compose. 
- install docker and docker-compose
- copy [nginx/http/docker-compose.yml](https://github.com/mironouz/remote-school-react/blob/master/nginx/http/docker-compose.yml)
or create a file with its content on your machine
- run `docker-compose --compatibility up` (or `docker-compose --compatibility up -d` 
if you want to run app in the background)

Containers with react frontend, spring rest backend and nginx as a reverse proxy will be
downloaded and started. Frontend will be available at 80 port, so you can access it just
by opening browser and opening "localhost" or "127.0.0.1" if you started it on the same 
machine. For information on rest backend api you should check 
[remote school api](https://github.com/mironouz/remote-school-api) repository.