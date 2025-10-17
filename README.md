# Next.js Template

A comprehensive Next.js template with routing, API routes, loading states, and error boundaries.

## Features

- **App Router** - File-based routing with layouts and nested routes
- **API Routes** - RESTful API endpoints (`/api/health`, `/api/data`)
- **Loading States** - Automatic loading UI with `loading.tsx` files
- **Error Boundaries** - Graceful error handling with `error.tsx` files
- **TypeScript** - Full type safety with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Component Libraries** - Optional setup for Hero UI, shadcn/ui, or Chakra UI
- **Custom 404 Page** - Branded not-found page
- **Setup Script** - Interactive CLI to customize your project

## Getting Started

### 1. Run the Setup Script

The interactive setup script will configure everything for you:

```bash
npm run setup "My Project Name"
```

Or run it interactively (it will prompt for the project name):

```bash
npm run setup
```

**What the setup script does:**
- ✅ Updates all template references with your project name
- ✅ Cleans and installs all dependencies (`npm ci`)
- ✅ Presents an interactive menu to choose a component library
- ✅ **Automatically installs and configures** your selected library:
  - **Hero UI**: Installs packages, adds provider to layout.tsx, updates tailwind.config.ts
  - **shadcn/ui**: Initializes shadcn, installs 6 common components (button, card, input, label, dialog, dropdown-menu)
  - **Chakra UI**: Installs packages and adds ChakraProvider to layout.tsx
  - **None**: Skip component library installation
- ✅ Components are ready to use immediately after setup!

### 2. Start Development

After setup completes, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── loading.tsx         # Root loading UI
├── error.tsx           # Root error boundary
├── not-found.tsx       # 404 page
├── about/
│   ├── page.tsx        # About page
│   ├── loading.tsx     # About loading UI
│   └── error.tsx       # About error boundary
├── dashboard/
│   ├── layout.tsx      # Dashboard layout with sidebar
│   ├── page.tsx        # Dashboard page
│   ├── loading.tsx     # Dashboard loading UI
│   └── settings/
│       └── page.tsx    # Nested route
└── api/
    ├── health/
    │   └── route.ts    # Health check endpoint
    └── data/
        └── route.ts    # CRUD data endpoint
```

## Component Libraries

The setup script provides **fully automated installation and configuration** for popular component libraries:

### Hero UI
React components built on top of Tailwind CSS with beautiful design and accessibility.

**Automatic Setup:**
- ✅ Installs `@heroui/react` and `framer-motion`
- ✅ Adds `HeroUIProvider` to `layout.tsx`
- ✅ Updates `tailwind.config.ts` with Hero UI plugin

**Usage after setup:**
```tsx
import { Button, Card, Input } from '@heroui/react';

<Button color="primary">Click me</Button>
```

**Documentation:** https://www.heroui.com

### shadcn/ui
Beautifully designed components built with Radix UI and Tailwind CSS.

**Automatic Setup:**
- ✅ Initializes shadcn/ui with default configuration
- ✅ Auto-installs 6 common components:
  - `button`, `card`, `input`, `label`, `dialog`, `dropdown-menu`
- ✅ Creates `components/ui` directory structure

**Usage after setup:**
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

<Button variant="default">Click me</Button>
```

**Add more components:**
```bash
npx shadcn@latest add [component-name]
```

**Documentation:** https://ui.shadcn.com

### Chakra UI
Simple, modular and accessible component library for React applications.

**Automatic Setup:**
- ✅ Installs `@chakra-ui/react`, `@emotion/react`, `@emotion/styled`, and `framer-motion`
- ✅ Adds `ChakraProvider` to `layout.tsx`
- ✅ Configures "use client" directive

**Usage after setup:**
```tsx
import { Button, Box, Card, Input } from '@chakra-ui/react';

<Button colorScheme="blue">Click me</Button>
```

**Documentation:** https://chakra-ui.com

### None
Skip component library installation and use your own preferred solution or add one manually later.

## API Endpoints

### Health Check
```bash
GET /api/health
```

### Data CRUD Operations
```bash
GET    /api/data        # Get all items
GET    /api/data?id=1   # Get item by ID
POST   /api/data        # Create new item
PUT    /api/data        # Update item
DELETE /api/data?id=1   # Delete item
```

## Learn More

To learn more about Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy

Deploy your Next.js app using [Vercel](https://vercel.com/new) or any Node.js hosting platform.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
