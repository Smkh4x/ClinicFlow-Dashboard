# ClinicFlow - Patient & Appointment Management System

ClinicFlow is a modern, responsive web application (PERN stack) designed for small clinics to manage patients, appointments, and staff users. 

This project was built following strict requirements for clean architecture, a solid database design, and a functional React UI.

##  Features

- **Authentication & Roles**: Secure JWT-based authentication with `admin` and `staff` role differentiation. Password hashing via `bcrypt`.
- **Patient Management**: Full CRUD operations for patients (Create, Read, Update, Delete - admin only). Includes pagination and search by Name or CIN.
- **Appointment Management**: Create and track appointments with statuses (`pending`, `confirmed`, `cancelled`). Includes a strict business rule: *A patient cannot have two confirmed appointments within a 30-minute window*.
- **Dashboard Analytics**: Real-time statistics displaying total patients, today's appointments, pending, and confirmed counts.
- **Dark Mode UI**: Beautiful, fully responsive React interface with Dark/Light mode support.

##  Architecture & Tech Stack

This project uses a monorepo structure powered by `pnpm workspaces`:

- **Database**: PostgreSQL (UUIDs, strict Foreign Key constraints, Indexes, ENUM checks).
- **Backend (apps/api)**: Node.js, Express, TypeScript. Layered architecture (Routes ➔ Controllers ➔ Services ➔ Repositories). Input validation via `Zod`.
- **Frontend (apps/web)**: React, Vite, TypeScript. Custom responsive UI (Vanilla CSS) without heavy component libraries.

##  Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- `pnpm` (install via `npm install -g pnpm`)
- Docker & Docker Compose (for the PostgreSQL database)

### 2. Clone the repository
```bash
git clone https://github.com/Smkh4x/ClinicFlow-Dashboard.git
cd ClinicFlow-Dashboard
```

### 3. Install dependencies
```bash
pnpm install
```

### 4. Setup Environment Variables
Duplicate `.env.example` to `.env` (or just use the provided `.env` for local testing).
```bash
cp .env.example .env
```

### 5. Start the Database (Docker)
```bash
pnpm docker:up
```

### 6. Run Database Migrations & Seed Data
This will create the necessary tables, relationships, and populate the database with test data.
```bash
pnpm --filter api run db:migrate
pnpm --filter api run db:seed
```

### 7. Start the Development Server
This will start both the frontend (`localhost:5173`) and the backend API (`localhost:4000`) concurrently.
```bash
pnpm dev
```

##  Default Test Credentials

The database seed provides the following default users:

**Admin:**
- Email: `admin@clinicflow.com`
- Password: `password123`

**Staff:**
- Email: `staff1@clinicflow.com`
- Password: `password123`
