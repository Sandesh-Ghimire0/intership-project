# Real-Time Task Management System
This project is a full-stack real-time task management system built with Next.js, React, Tailwind CSS, and MongoDB. In this application, users can create task and assign it to multiple people. The application includes a dashboard where users can view all tasks at a glance, monitor their progress by status and priority, and quickly identify pending or overdue work. Features such as real-time task updates and activity logs ensure that changes like task creation, deletion, or status updates are immediately reflected in the UI, making it suitable for productivity tracking and collaborative task management.

## Table of Content

- [setup](#setup)
- [Installation](#installation)
- [Task 1: Monorepo setup](#task-1-monorepo-setup)
- [Task 2: created app with next.js and mongodb](#task-2-created-app-with-nextjs-and-mongodb)
- [Task 3: Implement typescript](#task-3-implement-typescript)
- [Task 4: Dockerize](#task-4-dockerize)
- [Task 5: Folder structure](#task-5-folder-structure)

## setup

This turborepo includes the following packages and apps

- `web`: a Next.js app
- `api`: express and mongodb backend
- `@repo/ui`: a React component library used by `web` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% Typescript


## Installation

### 1. Prerequisites
Make sure you have the following installed:

- Node.js >= 18
- pnpm
- MongoDB (running locally)

### 2.  Clone Repository
```bash
git clone https://github.com/Sandesh-Ghimire0/intership-project.git
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Add envs
`For web`

```bash
cd apps/web
```
**create .env.local file**
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```
<br>

`For api`
```bash
cd apps/api
```
**create .env file**
```bash
PORT=4000
MONGO_URI="mongodb://127.0.0.1:27017/taskmanager"
```

**5. Run Server**
```bash
pnpm turbo run dev
```

**Notes** <br>
- localhost:3000 ---------> web <br>
- localhost:4000 ---------> api
- `Ensure MongoDB is running before starting the API`
## Task 1: Monorepo setup

**Create a Monorepo structure**

- created a monorepo using turborepo.
- setup two apps [web](./apps/web/) and [api](./apps/api/)
- `/web`
    - created a Next.js app with default configuration
    - added typescript configuration in `tsconfig.json` by extending the `nextjs.json` from shared package `@repo/typescript-config`

- `/api`
    - Initialized a NodeJs backend service
    - added scripts in `package.json`
    - added typescript configuration in `tsconfig.json` by extending the `base.json` from shared package `@repo/typescript-config`

## Task 2: created app with next.js and mongodb

**Create a React or next.js app with mongodb** <br><br>
`/api`

- Created method ([connectDB](./apps/api/src/config/db.ts)) to establish connection with mongodb (local).
- Added [Models](./apps/api/src/routes/v1/) [Controllers](./apps/api/src/routes/v1/) and [Routes](./apps/api/src/routes/v1/)

`/web`

- added next.js [App Router](./apps/web/app/)
- created a [layout](<./apps/web/app/(root)/layout.tsx>) component
- created a server component to [fetch](<./apps/web/app/(root)/tasks/page.tsx>) and client components to [create, display , Delete](./apps/web/features/tasks/) task

## Task 3: Implement typescript

**Use typescript interface and type to ensure type safety**

`/api`

- Added built in express types like `Request` and `Response`
- created a interface [ITask](./apps/api/src/routes/v1/shared/types/type.ts) and implemented in controllers and models

`/web`

- created interface [ITask](./apps/web/features/tasks/type.ts) and implemented across tasks [components and methods](./apps/web/features/tasks/)
- created types for [formData](./apps/web/features/tasks/TaskForm.tsx)
- created interface for props


## Task 4: Dockerize

**Dockerize the apps**


- created Dockerfile for [api](./apps/api/Dockerfile) and [web](./apps/web/Dockerfile)
- Added [scripts](./package.json) for pruning and dockerizing the apps with single command


## Task 5: Folder structure
Updated the folder stucture for the [backend](./apps/api/src)