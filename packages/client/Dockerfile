# ----------------------------------------------
# STAGE 1: Build
# ----------------------------------------------

FROM oven/bun:1 AS base

WORKDIR /app

# Copy package.json files
COPY package.json bun.lockb* ./
COPY packages/client/package.json ./packages/client/

# Install dependencies
RUN cd /app/packages/client/ && bun install --frozen-lockfile

COPY . .

RUN bun run build

# ----------------------------------------------
# STAGE 2
# ----------------------------------------------

FROM nginx:alpine

COPY --from=base /app/dist /usr/share/nginx/html
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]