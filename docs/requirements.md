# Requirements Traceability

## Authentication
- Feature: Login, User Session
- Implementation: `POST /api/auth/login`, `GET /api/auth/me`
- Stack: JWT, bcrypt, Authentication middleware, Role middleware (Admin/Staff).

## Patients
- Feature: Patient Management
- Implementation: `POST /api/patients`, `GET /api/patients`, `GET /api/patients/:id`, `PUT /api/patients/:id`, `DELETE /api/patients/:id`
- Database: `patients.cin UNIQUE`, search index on patient names.

## Appointments
- Feature: Appointment Management
- Implementation: `POST /api/appointments`, `GET /api/appointments`, `PATCH /api/appointments/:id/status`
- Business Rule: A patient cannot have two confirmed appointments within a 30-minute window.
- Statuses: pending, confirmed, cancelled.

## Dashboard
- Feature: Statistics
- Implementation: `GET /api/dashboard`
