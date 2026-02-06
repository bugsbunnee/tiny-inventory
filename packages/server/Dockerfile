# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package.json bun.lockb* ./
COPY packages/server/package.json ./packages/server/

# Install dependencies
RUN cd /app/packages/server/ && bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

USER bun
EXPOSE 3088

# Set the entrypoint to run server
CMD ["bun", "run", "start"]