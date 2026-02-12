# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package.json files
COPY packages/server/package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY ./packages/server .

RUN chown -R bun:bun /app

USER bun
EXPOSE 3088


# Set the entrypoint to run server
CMD ["bun", "run", "start"]