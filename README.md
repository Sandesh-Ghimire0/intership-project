# Real-Time Task Management System

## Table of Content

- [setup](#setup)
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