# ----------------------------------------------
# STAGE 1: Build
# ----------------------------------------------

FROM oven/bun:1 AS base

WORKDIR /app

# Copy package.json files
COPY packages/client/package.json bun.lockb*  ./

# Install dependencies
RUN bun install --frozen-lockfile

COPY ./packages/client .

RUN bun run build

# ----------------------------------------------
# STAGE 2
# ----------------------------------------------

FROM nginx:alpine

COPY --from=base /app/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]