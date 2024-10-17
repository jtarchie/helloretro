FROM node AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn run build --base=https://helloretro.app

FROM alpine:latest

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/pb_hooks /app/pb_hooks
COPY --from=build /app/pb_migrations /app/pb_migrations

ARG PB_VERSION=0.22.19

RUN apk add --no-cache \
    ca-certificates \
    sqlite \
    openssh

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080", "--publicDir=/app/dist/", "--automigrate", "--dir=/var/pb_data", "--migrationsDir=/app/pb_migrations", "--hooksDir=/app/pb_hooks", "--origins=https://helloretro.app"]
