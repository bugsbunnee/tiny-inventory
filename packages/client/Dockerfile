# ----------------------------------------------
# STAGE 1: Build
# ----------------------------------------------

FROM oven/bun:1 AS base

WORKDIR /app

# Copy package.json files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

COPY . .

RUN cd /app/packages/client && bun install --frozen-lockfile && bun run build

# ----------------------------------------------
# STAGE 2
# ----------------------------------------------

FROM nginx:alpine

COPY --from=base /app/packages/client/dist /usr/share/nginx/html
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]