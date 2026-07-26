FROM node:20-slim

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate

EXPOSE 8000

CMD ["pnpm", "start"]
