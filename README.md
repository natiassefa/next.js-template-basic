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

### 1. Customize the Template

Run the setup script to personalize the template with your project name and optionally install a component library:

```bash
npm run setup "My Project Name"
```

Or run it interactively:

```bash
npm run setup
```

The setup script will:
- Update all template references with your project name
- Let you choose a component library (Hero UI, shadcn/ui, Chakra UI, or none)
- Automatically install and configure your selected component library

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

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

The setup script supports the following component libraries:

### Hero UI
React components built on top of Tailwind CSS with a focus on accessibility and customization.
- **Website:** https://www.heroui.com
- **Installation:** Selected during setup script

### shadcn/ui
Beautifully designed components built with Radix UI and Tailwind CSS that you can copy and paste into your apps.
- **Website:** https://ui.shadcn.com
- **Installation:** Selected during setup script
- **Usage:** Run `npx shadcn@latest add [component]` to add components

### Chakra UI
A simple, modular and accessible component library that gives you the building blocks to build React applications.
- **Website:** https://chakra-ui.com
- **Installation:** Selected during setup script

### None
Skip component library installation and use your own preferred solution.

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
