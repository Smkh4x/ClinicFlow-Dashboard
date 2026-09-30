# ClinicFlow

## Overview
ClinicFlow is a small clinic management MVP application that handles patients, appointments, users, roles, and dashboard statistics.

## Tech Stack
- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Package Manager**: pnpm workspaces
- **Containerization**: Docker Compose

## Architecture
The monorepo structure allows for clear separation of concerns between `apps/web` and `apps/api`. The API is built using a layered architecture: Routes -> Controllers -> Services -> Repositories.

## Project Structure
```text
clinicflow/
├── apps/
│   ├── web/        # React application
│   └── api/        # Express application
├── packages/       # Shared packages (future)
├── infrastructure/ # Docker and infrastructure configuration
├── docs/           # Architecture and requirement docs
├── scripts/        # Helper scripts
```

## Requirements
See [docs/requirements.md](docs/requirements.md) for full traceability of business rules and planned implementations.

## Installation
```bash
pnpm install
```

## Environment Variables
Copy `.env.example` to `.env` and fill out the details.

## Development
To start the entire stack:
```bash
pnpm docker:up
pnpm dev
```

## Docker
PostgreSQL is provided via Docker in development.
```bash
pnpm docker:up
pnpm docker:down
pnpm docker:logs
```

## Database
The database uses PostgreSQL with UUID primary keys.

## Migrations
(Not yet implemented in Phase 1)
```bash
pnpm db:migrate
```

## Seed
(Not yet implemented in Phase 1)
```bash
pnpm db:seed
```

## Testing
(Not yet implemented)
```bash
pnpm test
```

## API
Backend endpoints are strictly separated and will support roles (Admin/Staff) and JWT authentication. See architecture docs.

## Future Desktop Application
The UI and API layers are strictly decoupled. The React frontend can be packaged into an Electron/Tauri shell in the future without changing the React application structure.

## Git Workflow
Changes are committed incrementally. Please check the commit history.
