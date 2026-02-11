FROM node:22-alpine

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm install -g pnpm

COPY json/ .

# Install using the lockfile as the "source of truth"
RUN pnpm install --frozen-lockfile

COPY full/ .

# 5. Build and Start
RUN pnpm run build --filter=web
EXPOSE 3000
CMD ["pnpm", "--filter=web", "run", "start"]