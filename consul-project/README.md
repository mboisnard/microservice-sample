# ESGI Consul Example

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# development
$ npm run start (default configuration)
$ APPLICATION_PORT=${port} CONSUL_HOST=${ip} CONSUL_PORT=${port} npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
