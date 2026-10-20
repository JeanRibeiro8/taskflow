# TaskFlow

**Full-Stack Task Management Application**

TaskFlow is a task management web application built with Next.js, React, TypeScript, and PostgreSQL. It combines user authentication, persistent task management, and a Kanban board to help users organize tasks and track their progress.

Developed as a portfolio project, TaskFlow demonstrates practical experience with full-stack web development, REST API design, database integration, authentication, data validation, and automated testing.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest&logoColor=white)

---

## Project Links

- **GitHub Repository:** [JeanRibeiro8/taskflow](https://github.com/JeanRibeiro8/taskflow)
- **Live Demo:** Not currently documented.

## Overview

TaskFlow provides a simple workspace for creating tasks, organizing them by status, and tracking progress through a Kanban board.

Users can register, sign in, create tasks, change their status, and remove tasks. Task data is stored in PostgreSQL, while server-side authentication and ownership checks help keep each user's tasks isolated.

The project focuses on a practical full-stack workflow without introducing unnecessary infrastructure or features beyond its core scope.

### Project Goals

- Build a full-stack application with Next.js App Router.
- Implement authentication using signed session tokens.
- Develop task CRUD operations through Route Handlers.
- Persist user and task data with PostgreSQL and Prisma ORM.
- Validate incoming data with Zod.
- Apply user-specific authorization to private task operations.
- Practice automated testing with Vitest.
- Maintain a clear and reproducible local development setup.

## Screenshots
```markdown
![TaskFlow Dashboard](./public/screenshots/dashboard.png)
```

## Features

### Authentication

- User registration with email and password.
- Login with credential validation.
- Signed session tokens using JOSE.
- Session cookies configured as HTTP-only.
- Session verification through a dedicated endpoint.
- Logout by clearing the session cookie.
- Password hashing with bcryptjs.

### Task Management

- Create tasks using a title.
- List tasks belonging to the authenticated user.
- Update task status.
- Delete tasks.
- Store task creation and update timestamps.
- Assign task priorities: Low, Medium, and High.
- Validate task titles and status values.

**Current scope:** Task editing is limited to status changes. Editing titles, descriptions, and priorities is not documented as implemented functionality.

### Kanban Board

- Three workflow columns: To Do, In Progress, and Done.
- Display tasks according to their current status.
- Change a task's status through a selection control.
- Display task counts for each column.
- Show summary counters for total, in-progress, and completed tasks.

### Interface and Feedback

- Dashboard-oriented layout.
- Responsive Tailwind CSS styling.
- Login and registration forms.
- Loading indicators during session verification and task creation.
- User-facing error messages.
- Task updates reflected in the interface after successful API responses.

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js App Router | Application structure and server-side capabilities |
| React 19 | Component-based user interface |
| TypeScript | Static typing with strict compiler settings |
| Tailwind CSS 4 | Utility-based styling and responsive layouts |

### Backend and API

| Technology | Purpose |
|---|---|
| Next.js Route Handlers | HTTP endpoints for authentication and task operations |
| Node.js | Server-side JavaScript runtime |

### Database and ORM

| Technology | Purpose |
|---|---|
| PostgreSQL | Persistent relational data storage |
| Prisma ORM 7 | Database queries and schema modeling |
| `@prisma/adapter-pg` | PostgreSQL adapter for Prisma |
| `pg` | PostgreSQL driver |

### Authentication and Validation

| Technology | Purpose |
|---|---|
| JOSE | JWT creation and verification |
| bcryptjs | Password hashing and password verification |
| Zod | Runtime validation of incoming data |

### Testing and Development

| Technology | Purpose |
|---|---|
| Vitest | Automated test execution |
| React Testing Library | Component testing utilities |
| Testing Library Jest DOM | DOM assertion matchers |
| ESLint | Static code analysis |
| Git and GitHub | Version control and repository hosting |

## Architecture

TaskFlow uses the Next.js App Router to organize its interface and server-side endpoints within a single application.

The client interface sends HTTP requests to Route Handlers. Private task operations retrieve and verify the current session, validate incoming data with Zod where applicable, and use Prisma to query or modify PostgreSQL records.

### Application Flow

```text
React Interface
      |
      v
Next.js Route Handlers
      |
      v
Session Verification
      |
      v
Zod Validation
      |
      v
User Ownership Checks
      |
      v
Prisma ORM
      |
      v
PostgreSQL
```

The validation and authorization steps depend on the endpoint; session verification and task ownership checks are applied to the private task operations.

### Project Structure

```text
taskflow/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── me/
│   │   │   │   └── register/
│   │   │   └── tasks/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── lib/
│       ├── auth.ts
│       ├── session.ts
│       ├── prisma.ts
│       └── validations/
│           ├── auth.ts
│           ├── auth.test.ts
│           ├── task.ts
│           └── task.test.ts
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── prisma7.config.ts
├── tsconfig.json
├── vitest.config.ts
└── vitest.setup.ts
```

This is a simplified view of the relevant project files. The `prisma/migrations/` directory is configured in the Prisma configuration; verify that the initial migration files are present before relying on an existing migration history.

### Key Responsibilities

- **`src/app/page.tsx`** — Main interface, authentication forms, task creation, Kanban columns, and task interactions.
- **`src/app/api/auth/`** — Registration, login, session lookup, and logout endpoints.
- **`src/app/api/tasks/route.ts`** — Task listing, creation, status updates, and deletion.
- **`src/lib/auth.ts`** — JWT signing and verification.
- **`src/lib/session.ts`** — Reading and validating the session cookie.
- **`src/lib/prisma.ts`** — Prisma Client and PostgreSQL adapter initialization.
- **`src/lib/validations/`** — Authentication and task validation schemas and their tests.
- **`prisma/schema.prisma`** — User and task models, status and priority enums, and their relationship.
- **`prisma7.config.ts`** — Prisma schema, migrations, and database connection configuration.
- **`vitest.config.ts`** — Test environment, module aliases, and test file discovery.

## API Reference

The following endpoints are implemented in the repository.

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a user | Not required |
| `POST` | `/api/auth/login` | Validate credentials and create a session | Not required |
| `POST` | `/api/auth/logout` | Clear the session cookie | Not required by the handler |
| `GET` | `/api/auth/me` | Retrieve the current user's public information | Required |
| `GET` | `/api/tasks` | List the current user's tasks | Required |
| `POST` | `/api/tasks` | Create a task | Required |
| `PATCH` | `/api/tasks` | Update a task's status | Required |
| `DELETE` | `/api/tasks?id={id}` | Delete a task owned by the current user | Required |

### Request Details

**Register — `POST /api/auth/register`**

Accepts an email and password. The email is normalized to lowercase, the password is hashed, and the endpoint returns `201 Created` when registration succeeds.

**Login — `POST /api/auth/login`**

Accepts an email and password. Successful authentication returns the user's public information and sets the `taskflow_session` cookie.

**Create a task — `POST /api/tasks`**

Example request body:

```json
{
  "title": "Review React fundamentals"
}
```

The authenticated user's ID is used as the task owner. A successful creation returns `201 Created`.

**Update status — `PATCH /api/tasks`**

Example request body:

```json
{
  "id": 1,
  "status": "IN_PROGRESS"
}
```

Supported statuses are `TODO`, `IN_PROGRESS`, and `DONE`.

**Delete a task — `DELETE /api/tasks?id=1`**

The task ID is provided as a query parameter. The handler checks task ownership before deletion.

### Error Handling

The implemented handlers return appropriate HTTP status codes for common outcomes, including:

- `400 Bad Request` — Invalid input.
- `401 Unauthorized` — Missing or invalid authentication.
- `404 Not Found` — Task not found for the current user.
- `409 Conflict` — Email already registered.
- `500 Internal Server Error` — Unexpected server-side failure.

## Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) compatible with Next.js 16; Node.js 20.9 or later is required.
- npm.
- [Git](https://git-scm.com/).
- [PostgreSQL](https://www.postgresql.org/).

### 1. Clone the Repository

```bash
git clone https://github.com/JeanRibeiro8/taskflow.git
cd taskflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

The repository's `.env.example` file was not found during inspection. Create a local `.env` file in the project root with the required variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/taskflow?schema=public"
JWT_SECRET="REPLACE_WITH_A_SECURE_SECRET_OF_AT_LEAST_32_CHARACTERS"
```

Replace the database connection values with your local PostgreSQL credentials.

Generate a secure JWT secret using Node.js:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

This generates a 64-character hexadecimal secret. Copy the generated value into `.env` and keep that file out of version control.

The application requires `JWT_SECRET` to contain at least 32 characters.

### 4. Create the PostgreSQL Database

Create a database named `taskflow` using your PostgreSQL installation, or use a database that you have permission to access.

For example, with PostgreSQL command-line tools:

```bash
createdb taskflow
```

Ensure that `DATABASE_URL` matches your local database, username, password, host, and port.

### 5. Apply Database Migrations

The project uses a custom Prisma configuration file named `prisma7.config.ts`.

Generate the Prisma Client:

```bash
npx prisma generate --config prisma7.config.ts
```

Apply the database migrations:

```bash
npx prisma migrate dev --config prisma7.config.ts
```

These commands assume the Prisma CLI and database are configured correctly. If no initial migration exists, create the initial migration using the configured Prisma setup before applying migrations in a fresh environment.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret used to sign and verify session tokens; at least 32 characters |

### Security Notes

- Never commit `.env` or other files containing real secrets.
- Keep `JWT_SECRET` on the server.
- Do not expose password hashes or authentication tokens in API responses.
- Use `.env.example` to document required variables without storing actual credentials.

## Database Schema

The Prisma schema defines two models and two enums.

### User

- `id` — Auto-incrementing identifier.
- `email` — Unique email address.
- `passwordHash` — Hashed password.
- `createdAt` — Account creation timestamp.
- `updatedAt` — Last update timestamp.
- `tasks` — Related tasks.

### Task

- `id` — Auto-incrementing identifier.
- `title` — Task title.
- `status` — Current workflow status.
- `priority` — Task priority.
- `createdAt` — Creation timestamp.
- `updatedAt` — Last update timestamp.
- `userId` — Optional reference to the owning user in the current schema.
- `user` — User relationship.

### Enums

**TaskStatus:** `TODO`, `IN_PROGRESS`, `DONE`

**TaskPriority:** `LOW`, `MEDIUM`, `HIGH`

The current schema supports task priorities and stores them in PostgreSQL. The implemented interface displays the priority, but the available task update endpoint only changes status.

## Testing and Code Quality

TaskFlow uses Vitest for automated tests, with tests focused on the Zod authentication and task validation schemas.

The existing tests verify behavior such as:

- Accepting valid registration and login data.
- Rejecting invalid email addresses.
- Enforcing registration password length requirements.
- Trimming email and task-title whitespace.
- Rejecting empty or excessively long task titles.
- Accepting valid task statuses and rejecting invalid IDs or status values.

The validation tests have been confirmed as passing during project development. They do not represent full end-to-end coverage of authentication, database operations, or the complete interface.

### Run Tests

```bash
npm test
```

Run the test suite in watch mode:

```bash
npm run test:watch
```

### Run ESLint

```bash
npm run lint
```

### Check TypeScript

```bash
npx tsc --noEmit
```

### Build for Production

```bash
npm run build
```

These commands are available for local verification. Do not interpret the existence of a script as proof that linting, type checking, or the production build has passed in every environment.

## Security

Security-related implementation details include:

- **Password hashing:** bcryptjs hashes passwords before they are stored.
- **Signed sessions:** JOSE creates and verifies JWT session tokens.
- **Token expiration:** Session tokens expire after seven days.
- **HTTP-only cookies:** The session cookie is not accessible to client-side JavaScript.
- **Cookie configuration:** The session cookie uses `SameSite=Lax` and is marked `Secure` in production.
- **Input validation:** Zod schemas validate authentication data, task titles, IDs, and status values.
- **Ownership checks:** Task listing, status updates, and deletion are restricted to tasks belonging to the authenticated user.
- **Server-side secrets:** The JWT signing secret and database connection string are read from environment variables.

These controls are part of the current implementation, but they do not constitute a complete security audit. Production deployment should include further review of cookie behavior, CSRF considerations, rate limiting, error logging, and database configuration.

## Learning Outcomes

TaskFlow provides practical experience with:

- Full-stack application development using Next.js App Router.
- React and strict TypeScript.
- REST-style API design and HTTP status codes.
- User registration, login, and session management.
- Password hashing and JWT verification.
- PostgreSQL data modeling and Prisma ORM.
- Server-side input validation with Zod.
- User-specific authorization and data isolation.
- State-driven interfaces and Kanban workflows.
- Automated schema testing with Vitest.
- Environment configuration and database migrations.
- Code quality checks with ESLint and TypeScript.

## Future Improvements

Potential improvements for future versions include:

- Add task title and description editing.
- Allow users to change task priorities.
- Add task search, filtering, and sorting.
- Add deletion confirmation and more detailed success feedback.
- Expand automated tests to cover API handlers and database authorization.
- Add an `.env.example` file and complete local setup documentation.
- Add real application screenshots.
- Configure continuous integration with GitHub Actions.
- Deploy the application and document its production configuration.

These items are planned improvements, not claims about existing functionality.

## License

No license file was confirmed in the repository during this review. Until a license is added, the project should not be assumed to be available for unrestricted reuse, modification, or distribution.

If you decide to publish the project under an open-source license, add the appropriate `LICENSE` file and update this section.

## Author

**Jean Ribeiro** — Frontend and Full-Stack Developer

- **GitHub:** [JeanRibeiro8](https://github.com/JeanRibeiro8)
- **LinkedIn:** [Jean Ribeiro](https://www.linkedin.com/in/jean-ribeiro-9a3792267/)
- **Portfolio:** [jeanribeiro8.github.io/JeanRibeiro](https://jeanribeiro8.github.io/JeanRibeiro/)
- **Email:** [jeanrsantos10@gmail.com](mailto:jeanrsantos10@gmail.com)

---

<p align="center">
  Built to practice full-stack development, authentication, and persistent task management.
</p>