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
git checkout dev
```

```
npm install
```

## Configure

rename .env.example to .env
Note: without .env file, the app will start on default port 4000.

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation in Swagger UI by typing http://localhost:4000/api/

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```
