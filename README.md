# GrabWay - E-commerce Application

A full-featured e-commerce web application for selling honey and home essentials, built with Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, and Razorpay payments.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui components
- **Backend**: Next.js API Routes (Route Handlers)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth.js v5 (NextAuth) with credentials + Google OAuth
- **Payments**: Razorpay (UPI, Cards, NetBanking)
- **State Management**: Zustand (cart persistence)
- **Deployment**: Hostinger VPS (standalone build)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Razorpay account (for payments)
- Cloudinary account (for image hosting, optional)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd ecommerce
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in your database URL and API keys in `.env`.

3. **Set up the database:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Seed the database with sample data:**
   ```bash
   npm run db:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Credentials

- **Admin**: admin@grabway.in / admin123
- **Admin Dashboard**: http://localhost:3000/admin

## Project Structure

```
src/
├── app/
│   ├── (storefront)/     # Customer pages (products, cart, checkout, orders)
│   ├── (auth)/           # Authentication pages (login, signup, forgot-password)
│   ├── admin/            # Admin dashboard (products, categories, orders, users, coupons)
│   └── api/              # API route handlers
├── components/
│   ├── ui/               # Reusable UI components (Button, Input, Card, Badge)
│   ├── layout/           # Header, Footer
│   └── products/         # Product card component
├── lib/                  # Utilities (prisma client, auth config, razorpay, helpers)
├── store/                # Zustand stores (cart)
└── types/                # TypeScript types
```

## Features

### Customer Features
- Product browsing with search and category filters
- Product details with image gallery and reviews
- Shopping cart (persisted in localStorage)
- Checkout with address, coupon codes, and tax calculation
- Razorpay payment (UPI, Cards, NetBanking)
- Order tracking with status timeline
- Wishlist
- User authentication (email/password + Google OAuth)
- Password reset via email

### Admin Features
- Dashboard with stats (products, orders, revenue, users)
- Product CRUD (add, edit, delete with images)
- Category management (hierarchical)
- Order management (view, update status)
- User management
- Coupon creation and management

## Deployment (Hostinger VPS)

1. Build for production:
   ```bash
   npm run build
   ```

2. The `standalone` output is in `.next/standalone/`. Deploy with PM2:
   ```bash
   pm2 start .next/standalone/server.js --name grabway
   ```

3. Set up Nginx as reverse proxy and Let's Encrypt for SSL.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio GUI |
