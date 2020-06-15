FROM node:lts-alpine3.12 as builder

WORKDIR /micro-ci

COPY . /micro-ci/

RUN npm ci
RUN npm run build


FROM node:lts-alpine3.12

WORKDIR /micro-ci

COPY --from=builder /micro-ci/dist/ .

RUN npm install
CMD ["node", "src/main.js"]