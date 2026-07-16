# 05-development-rules.md

# YueHaoMao Development Rules

Version 1.0.0

---

# Language

Specification Language

English

Code Language

English

Product Language

Simplified Chinese

All UI copy must be written in Chinese.

All code comments must be written in English.

---

# Purpose

This document defines how the project should be implemented.

It does not define product logic or visual design.

Always follow:

01-product.md

02-information-architecture.md

03-design-system.md

04-interaction-system.md

before making implementation decisions.

---

# Technical Stack

Framework

Next.js 15

Language

TypeScript

Styling

Tailwind CSS

UI Components

shadcn/ui

Icons

Lucide React

Animation

Framer Motion

Package Manager

npm

Never replace the technology stack.

---

# Rendering Strategy

Prefer

Server Components

Only use

Client Components

when interaction is required.

Avoid unnecessary "use client".

---

# Folder Structure

```
app/

components/
    ui/
    common/
    business/

features/

hooks/

lib/

constants/

types/

data/

public/
```

Business logic should not be placed inside pages.

---

# Component Principles

Every component should have one responsibility.

Prefer composition over inheritance.

Avoid deeply nested components.

Maximum nesting depth:

4

---

# Component Reuse

If a UI appears more than once,

extract it into a reusable component.

Never duplicate component code.

---

# Naming Convention

Components

PascalCase

```
CatCard.tsx
```

Hooks

camelCase

```
useReservation.ts
```

Utilities

camelCase

```
formatDate.ts
```

Constants

UPPER_SNAKE_CASE

```
MAX_TAG_COUNT
```

Never mix naming styles.

---

# File Size

Recommended

<200 lines

Maximum

300 lines

If exceeded,

split into smaller components.

---

# Props

Always define TypeScript interfaces.

Avoid

any

Never pass unnecessary props.

Prefer explicit typing.

---

# State Management

Use

React Hooks

Prefer

useState

useMemo

useCallback

Avoid global state unless necessary.

No Redux.

No MobX.

No Zustand.

Current project does not require global state.

---

# Data Source

Use local mock data only.

Store mock data inside

/data

Never connect APIs.

Never create backend logic.

Never generate fake authentication.

---

# Styling Rules

Use Tailwind CSS only.

Do not write inline styles.

Do not create custom CSS files unless absolutely necessary.

Use Design Tokens defined in Design System.

Never hardcode colors.

Example

Good

```
bg-primary
rounded-card
text-primary
```

Bad

```
#4A90F5

20px
```

---

# Layout

Mobile First

Design Width

390px

Never implement desktop layout.

Never implement responsive breakpoints beyond mobile.

---

# Icons

Use

Lucide React

Only.

Never mix icon libraries.

---

# Images

Store images inside

/public/images

Use

next/image

Always.

Never use img.

---

# Accessibility

Minimum touch area

44×44

Buttons must have accessible labels.

Images must have alt text.

Never rely on color only.

---

# Performance

Lazy load images.

Avoid unnecessary re-render.

Avoid unnecessary animation.

Reuse components.

Minimize bundle size.

---

# Forms

Validate input immediately.

Display friendly error messages.

Never block users with technical errors.

---

# Error Handling

Never expose technical details.

Preferred

网络有点慢，

请稍后再试～

Avoid

500 Error

Request Failed

---

# Mock Data

Create realistic mock data.

Avoid Lorem Ipsum.

Avoid English placeholder text.

Example

Good

糯米

雪球

栗子

奶黄

Bad

Cat A

Test

Demo

Sample

---

# Code Quality

Keep functions small.

Avoid duplicated logic.

Prefer readable code.

Readability is more important than cleverness.

---

# Comments

Only explain

Why

Never explain

What

Bad

```ts
// Increment count
count++
```

Good

```ts
// Prevent duplicate reservations
```

---

# Git Style

One Task

↓

One Commit

Commit Message

```
feat(home): implement today's companion section

fix(card): improve hover interaction

refactor(button): extract common button component
```

---

# Out of Scope

Backend

Database

Authentication

Payment

CMS

Admin Panel

Analytics

Internationalization

Desktop Layout

PWA

Offline Mode

---

# Checklist

Before completing any task:

✓ TypeScript has no errors

✓ No duplicated components

✓ No inline styles

✓ Mobile layout only

✓ Uses Design Tokens

✓ Matches Design System

✓ Matches Interaction System

✓ UI copy is Chinese

✓ Mock data is realistic

✓ No unfinished TODO

Only after every item is satisfied,

the task can be considered complete.
