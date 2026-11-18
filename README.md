# Gyandeep Institute — Official Website

**Premium Navy Blue & Royal Gold** branded website for **Gyandeep Institute**, Morar, Gwalior.

## Institute Details

| Field       | Value |
|-------------|-------|
| **Name**    | Gyandeep Institute |
| **Address** | Baijal Kothi, Near Girls College, In Front of Cantonment Office, Morar Gwalior (MP)-474006 |
| **Phone**   | +917828499519 |
| **WhatsApp**| 917828499519 |
| **Email**   | ajaat7828@gmail.com |
| **Theme**   | Premium Navy Blue (#0A1F44) + Royal Gold (#C9A227) |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Image Storage**: Cloudinary
- **Auth**: JWT (jose) + bcryptjs
- **Deploy**: Vercel

## Setup

1. Clone the repo
2. Copy `.env.local.example` to `.env.local` and fill in your credentials:
   - New Neon database URL
   - New Cloudinary credentials
   - Set strong JWT_SECRET
   - Set ADMIN_USERNAME / ADMIN_PASSWORD

```bash
npm install
npm run db:push    # Push schema to new Neon DB
npm run dev        # Local development
```

## Vercel Deployment

Set all environment variables from `.env.local.example` in Vercel dashboard before deploying.

## Features

- 🏠 Public pages: Home, About, Courses, Gallery, Contact
- 🔐 Admin dashboard: Manage courses, gallery, announcements, contact info, settings
- 📱 WhatsApp lead form integration
- 📢 Scrolling announcement bar
- 🖼️ Cloudinary image upload
- 📍 Google Maps embed
