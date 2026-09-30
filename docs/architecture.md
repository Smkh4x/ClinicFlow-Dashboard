# ClinicFlow Architecture

## Monorepo
We use `pnpm` workspaces to separate our concerns while keeping dependency management centralized.
- `apps/web`: The React application.
- `apps/api`: The Node/Express application.

## Frontend
The React application architecture isolates concerns to keep the frontend agnostic to the platform:
- `src/components/`: Reusable UI elements.
- `src/pages/`: Route components.
- `src/services/`: HTTP request handlers (e.g. `api.ts`).

## Backend
The Express application is layered to isolate business rules from HTTP handling:
- **Routes**: Define HTTP paths and methods.
- **Controllers**: Extract request data, pass it to Services, and send the HTTP response.
- **Services**: Contain all business rules (e.g. Appointment conflict checking).
- **Repositories**: Handle PostgreSQL querying (via pg).
- **Validators**: Validate request bodies (e.g., Zod).

## Database
PostgreSQL is used. Core relationships:
- `users` (1 to many) `appointments`
- `patients` (1 to many) `appointments`

## Docker
Infrastructure is located at `infrastructure/docker/docker-compose.yml` to keep local development clean. PostgreSQL runs in a container with a volume to persist data.

## API Communication
The frontend will communicate via REST over HTTP to the backend. This strict boundary ensures no database operations occur on the client, which is essential for security and future desktop packaging.

## Future Desktop Architecture
By keeping API calls isolated in `src/services/`, the `apps/web` React app can be packaged inside Electron or Tauri. The shell will serve the UI, and the UI will continue to hit the backend API without changes.
