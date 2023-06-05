# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading and installing

```
git clone https://github.com/rishat-se/nodejs2022Q4-service.git
```

```
cd nodejs2022Q4-service
```

```
git checkout auth-dev
```

```
npm install
```

## Configure

rename .env.example to .env

## Build images

```
npm run docker:build
```

## Running application

```
npm run docker:start
```

## Running test

in Docker Desktop App through Container->App Container Name->Terminal run command:

```
npm run test:auth
```

or through console:

```
docker exec <App Container Name or ID> npm run test:auth
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation in Swagger UI by typing http://localhost:4000/doc/
