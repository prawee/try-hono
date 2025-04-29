FROM oven/bun:canary-slim

WORKDIR /app

COPY . .
RUN bun install
RUN bun run build

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["bun", "run", "start"]