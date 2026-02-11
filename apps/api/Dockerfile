FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy the pruned lockfile from your 'out' folder
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY json/ .

# install dependencies with the version defined in lock file
RUN pnpm install --frozen-lockfile

COPY full/ .

# 5. Build and Start
RUN pnpm run build --filter=api
EXPOSE 3000
CMD ["pnpm", "--filter=api", "run", "start"]





