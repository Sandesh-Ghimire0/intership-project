# Real-Time Task Management System
This project is a full-stack real-time task management system built with Next.js, React, Tailwind CSS, and MongoDB, designed to mimic a lightweight Jira/Trello-style workflow.In this application, users can create task and assign it to multiple people. The application includes a dashboard where users can view all tasks at a glance, monitor their progress by status and priority, and quickly identify pending or overdue work. Features such as real-time task updates and activity logs ensure that changes like task creation, deletion, or status updates are immediately reflected in the UI, making it suitable for productivity tracking and collaborative task management.

## Table of Content

- [setup](#setup)
- [Installation](#installation)
- [Assingment 1](#assignment-1)
- [Assingment 2](#assignment-2)
- [Assingment 3](#assignment-3)

## setup

This turborepo includes the following packages and apps

- `web`: a Next.js app
- `api`: express and mongodb backend
- `@repo/ui`: a React component library used by `web` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% Typescript


## Installation
**1. Prerequisites**
```bash
node >= 18
pnpm
MongoDB (running locally)
```

**2. Clone Repository**

```bash
git clone https://github.com/Sandesh-Ghimire0/intership-project.git
```

**3. Install Dependencies**<br>
```bash
pnpm install
```

**4. Add envs**
```bash
For web
- cd apps/web
- create .env.local file
- add:
    - NEXT_PUBLIC_API_URL=http://localhost:4000

```

```bash
For api
- cd apps/api
- create .env file
- add:
    - PORT=4000
    - MONGO_URI="mongodb://127.0.0.1:27017/taskmanager"

```

**5. Run Server**
```bash
pnpm turbo run dev
```

```bash
localhost:3000 ---------> web
localhost:4000 ---------> api
```
```md
## Notes
- Ensure MongoDB is running before starting the API
```
## Assignment 1

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

## Assignment 2

**Create a React or next.js app with mongodb** <br><br>
`/api`

- Created method ([connectDB](./apps/api/src/config/db.ts)) to establish connection with mongodb (local).
- Added [Models](./apps/api/src/models/task.model.ts) [Controllers](./apps/api/src/controllers/task.controller.ts) and [Routes](/apps/api/src/routes/task.route.ts)

`/web`

- added next.js [App Router](./apps/web/app/)
- created a [layout](<./apps/web/app/(root)/layout.tsx>) component
- created a server component to [fetch](<./apps/web/app/(root)/tasks/page.tsx>) and client components to [create, display , Delete](./apps/web/features/tasks/) task

## Assignment 3

**Use typescript interface and type to ensure type safety**

`/api`

- Added built in express types like `Request` and `Response`
- created a interface [ITask](./apps/api/src/types/type.ts) and implemented in controllers and models

`/web`

- created interface [ITask](./apps/web/features/tasks/type.ts) and implemented across tasks [components and methods](./apps/web/features/tasks/)
- created types for [formData](./apps/web/features/tasks/TaskForm.tsx)
- created interface for props