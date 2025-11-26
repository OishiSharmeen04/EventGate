# 🎫 TicketHub

A modern event ticketing platform built with Next.js 14, Express.js, and MongoDB. Users can browse events, create accounts, and manage their own events with a clean, responsive interface.

## 📋 Features

- Browse and search events by category
- User authentication (Email/Password & Google OAuth)
- Create and manage events (protected routes)
- Responsive design for all devices
- Real-time data with MongoDB Atlas
- JWT-based authentication

## 🛠️ Tech Stack

**Frontend:** Next.js 14 (App Router), NextAuth.js, Tailwind CSS  
**Backend:** Express.js, MongoDB, Mongoose, JWT  
**Database:** MongoDB Atlas (Cloud)

---

## 🚀 Setup & Installation

```bash
# Create Next.js app (from project root)
npx create-next-app@latest event-ticket-hub
cd event-ticket-hub

# Install additional dependencies
npm install next-auth lucide-react

```

### 4. Run Application

**Frontend:**
```bash
cd event-ticket-hub
npm run dev
```
---

## 🗺️ Routes Summary

### Frontend Routes

**Public Routes:**
- `/` - Landing page (Hero, Features, Events, Contact)
- `/events` - Browse all events with search/filter
- `/events/[id]` - Event details page
- `/login` - User login
- `/register` - User registration

**Protected Routes (Login Required):**
- `/add` - Create new event
- `/manage` - View and manage user's events

### Backend API Routes

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

**Events:**
- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get single event (public)
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)
- `GET /api/events/user/my-events` - Get user's events (protected)

---

## Live Demo

https://event-gate-demo.vercel.app/
