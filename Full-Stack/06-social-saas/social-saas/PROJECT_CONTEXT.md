# Social SaaS - Project Context

> This file is the source of truth for the current project architecture,
> technical decisions, completed work, and development direction.
>
> Keep this file updated when the architecture or important project decisions change.

---

# 1. Project Overview

## Project Name

Social SaaS

## Project Goal

Social SaaS is a SaaS web application for uploading, managing, processing,
and downloading images and videos.

The application uses Cloudinary for media storage and transformation.

The long-term goal is to provide useful media-processing tools for
social-media content creators.

Main workflow:

```text
Upload Media
     ↓
Store / Process with Cloudinary
     ↓
View Media
     ↓
Choose a Service
     ↓
Process Media
     ↓
Download Result

---

## Tech Stack

- Frontend
- Next.js 16.3.4
- React 19.2.8
- TypeScript 5
- Tailwind CSS 4
- DaisyUI 5.7.37
- Lucide React
- Backend
- Next.js App Router
- Next.js Route Handlers
- Axios
- Authentication
- Clerk @clerk/nextjs
- Database
- PostgreSQL
- Prisma 8 RC (8.0.0-rc.15)
- @prisma/orm-postgres
- Media
- cloudinary
- next-cloudinary
---

## Other Libraries
- Day.js
- filesize
- temporal-polyfill
- dotenv

---

## Package Versions
Next.js        16.3.4
React          19.2.8
TypeScript     5
Tailwind CSS   4
DaisyUI        5.7.37
Clerk          7.9.2
Cloudinary     2.11.0
next-cloudinary 6.19.3
Prisma         8.0.0-rc.15
Axios          1.20.0
Day.js         1.11.23
Lucide React   1.48.0

---

## Project Structure

src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── (services)/
│   │   ├── layout.tsx
│   │   ├── ServicesLayoutClient.tsx
│   │   │
│   │   ├── home/
│   │   │   └── page.tsx
│   │   │
│   │   ├── social-share/
│   │   │   ├── ClientPage.tsx
│   │   │   └── page.tsx
│   │   │
│   │   └── video-upload/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── image-upload/
│   │   │   └── route.ts
│   │   │
│   │   ├── video-upload/
│   │   │   └── route.ts
│   │   │
│   │   ├── video-download/
│   │   │   └── route.ts
│   │   │
│   │   └── videos/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── VideoCard.tsx
│
├── lib/
│   └── prisma.ts
│
├── types/
│   └── index.ts
│
└── proxy.ts

prisma/
├── contract.d.ts
├── contract.json
└── contract.prisma



## Authentication

Using Clerk.

Requirements:

- Users must authenticate before downloading
- Protected application routes
- Unauthenticated users should go to sign-in
- After authentication, users should return to the application

src/app/(services)/layout.tsx
              ↓
        auth.protect()
              ↓
ServicesLayoutClient.tsx
              ↓
     All service pages

---

## Video Features

- Upload videos
- Store/process through Cloudinary
- Compress videos
- Video preview
- Hover preview
- Download videos

---

## Image Features

- Upload image
- Select social-media aspect ratio
- Transform image using Cloudinary
- Preview transformed image
- Download transformed image

Supported examples:

- Instagram
- Facebook
- Twitter/X

---

## Database

Using:

Prisma + PostgreSQL

Current schema:

[PUT CURRENT PRISMA SCHEMA HERE]

---

## Important Routes

[LIST CURRENT ROUTES HERE]

---

## Current Components

[LIST IMPORTANT COMPONENTS HERE]

---

## Completed Features

- [x] Authentication
- [x] Video upload
- [x] Video preview
- [x] Image upload
- [ ] Download authentication
- [ ] UI improvements
- [ ] Dark/light mode
- [ ] Loading states
- [ ] Error handling

---

## Current Task

[WRITE CURRENT TASK HERE]

---

## Known Problems

1. ...
2. ...
3. ...

---

## Important Decisions

1. ...
2. ...
3. ...