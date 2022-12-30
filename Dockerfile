FROM node:hydrogen-bullseye as builder

RUN npm i -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

FROM nginx:1.23.3

COPY --from=builder /app/dist /usr/share/nginx/html
