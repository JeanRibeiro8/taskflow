# TaskFlow

<div align="center">

### Full-Stack Task Management Application

A modern task management application built with **Next.js, React, TypeScript, and PostgreSQL**, featuring user authentication, persistent task management, and a Kanban board.

TaskFlow demonstrates practical full-stack development skills through authentication, API design, database integration, data validation, and a structured task management workflow.

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

<br />

**[GitHub Repository](https://github.com/JeanRibeiro8/taskflow)**

</div>

---

## 📸 Preview

<div align="center">

### TaskFlow Dashboard

![TaskFlow Preview](./public/taskflow.png)

</div>

> **Repository:** [github.com/JeanRibeiro8/taskflow](https://github.com/JeanRibeiro8/taskflow)

---

## 📌 About the Project

**TaskFlow** is a full-stack task management application designed to help users organize their work through a Kanban board and a simple, focused dashboard.

Users can create an account, sign in, create tasks, track their progress across workflow columns, and delete tasks. Task data is persisted in PostgreSQL, while server-side authentication and ownership checks help ensure that users can access only their own tasks.

The project was built as part of my developer portfolio, with a focus on practical implementation rather than unnecessary complexity.

> **Portfolio focus:** Next.js App Router, React, TypeScript, REST API development, PostgreSQL, Prisma ORM, authentication, data validation, and automated testing.

---

## ✨ Features

### 🔐 Authentication

- User registration with email and password
- Login with credential validation
- JWT-based session management using JOSE
- HTTP-only session cookies
- Session verification through a dedicated endpoint
- Logout and session cookie clearing
- Password hashing with bcryptjs

### 📋 Task Management

- Create tasks with a title
- List tasks belonging to the authenticated user
- Update task status
- Delete tasks
- Display task creation and update timestamps
- Support for Low, Medium, and High priorities
- Validate task data before processing

> **Current scope:** Task updates are limited to status changes. Full editing of titles, descriptions, and priorities is not currently documented as implemented.

### 🗂️ Kanban Board

- Three workflow columns: To Do, In Progress, and Done
- Display tasks according to their current status
- Change task status through an interface control
- Task counts for individual workflow columns
- Summary counters for total, in-progress, and completed tasks

### 📊 Dashboard & User Interface

- Dashboard-oriented layout
- Task summary indicators
- Responsive styling with Tailwind CSS
- Login and registration forms
- Loading indicators during supported operations
- User-facing error messages
- UI updates after successful task operations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Application framework and App Router |
| **React 19** | Component-based user interface |
| **TypeScript** | Static typing with strict compiler settings |
| **Tailwind CSS 4** | Styling and responsive layouts |
| **Next.js Route Handlers** | Authentication and task API endpoints |
| **PostgreSQL** | Relational database and persistent storage |
| **Prisma ORM 7** | Database schema and queries |
| **JOSE** | JWT creation and verification |
| **bcryptjs** | Password hashing |
| **Zod** | Runtime data validation |
| **Vitest** | Automated test execution |
| **React Testing Library** | Component testing utilities |
| **ESLint** | Static code analysis |
| **Git & GitHub** | Version control and repository hosting |

---

## ⚛️ Technical Concepts Practiced

TaskFlow brings together frontend and backend concepts in a single application.

### Next.js & React

- App Router organization
- React component-based interfaces
- Client-side state and user interactions
- Form handling
- Conditional rendering
- Loading, error, and empty states

### TypeScript

- Strict type checking
- Typed request and response data
- Consistent task and user models
- Safer application logic

### Backend & API Development

- REST-style endpoints with Next.js Route Handlers
- HTTP methods such as `GET`, `POST`, `PATCH`, and `DELETE`
- Request validation
- HTTP status codes
- Server-side session verification
- User-specific task authorization

### Database & Persistence

- PostgreSQL relational data modeling
- Prisma schema and queries
- User-to-task relationships
- Database migrations
- Persistent storage for application data

### Authentication & Security

- Password hashing
- JWT signing and verification
- HTTP-only cookies
- Session expiration
- Validation of private operations
- Ownership checks for task access

---

## 🧩 Project Structure

TaskFlow uses the Next.js App Router and separates application routes, reusable server-side utilities, validation schemas, and database configuration.

```text
taskflow/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── taskflow.png
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
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── prisma7.config.ts
├── tsconfig.json
├── vitest.config.ts
└── vitest.setup.ts
```

*This is a simplified project tree. The screenshot path is included as the intended location; add the image only if it exists.*

### Key Directories & Files

- **`src/app/`** — Main application interface and App Router routes.
- **`src/app/api/auth/`** — Registration, login, current-session lookup, and logout endpoints.
- **`src/app/api/tasks/`** — Task listing, creation, status updates, and deletion.
- **`src/lib/auth.ts`** — JWT signing and verification utilities.
- **`src/lib/session.ts`** — Session cookie handling and token verification.
- **`src/lib/prisma.ts`** — Prisma Client and PostgreSQL adapter initialization.
- **`src/lib/validations/`** — Zod schemas and validation tests.
- **`prisma/schema.prisma`** — User and task models, relationships, and enums.
- **`prisma7.config.ts`** — Prisma configuration, including schema and migration paths.
- **`vitest.config.ts`** — Automated testing configuration.

---

## 🔄 Application Architecture

TaskFlow follows a server-backed application flow in which the interface communicates with Next.js Route Handlers, and the server uses Prisma to access PostgreSQL.

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
         Input Validation
              (Zod)
                 |
                 v
       Task Ownership Checks
                 |
                 v
            Prisma ORM
                 |
                 v
            PostgreSQL
```

The exact steps vary by endpoint. Private task operations verify the current session and check task ownership before performing the requested operation.

This structure keeps authentication, validation, data access, and presentation responsibilities organized without requiring a separate backend service.

---

## 🔌 API Reference

The application exposes the following endpoints:

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | Not required |
| `POST` | `/api/auth/login` | Authenticate a user and create a session | Not required |
| `POST` | `/api/auth/logout` | Clear the session cookie | Handler clears the cookie |
| `GET` | `/api/auth/me` | Retrieve the current user's information | Required |
| `GET` | `/api/tasks` | List the current user's tasks | Required |
| `POST` | `/api/tasks` | Create a task | Required |
| `PATCH` | `/api/tasks` | Update a task's status | Required |
| `DELETE` | `/api/tasks?id={id}` | Delete a task owned by the current user | Required |

### Task Statuses

The Kanban workflow uses three status values:

- `TODO`
- `IN_PROGRESS`
- `DONE`

Task priorities are represented by:

- `LOW`
- `MEDIUM`
- `HIGH`

The current task API supports creation, listing, status updates, and deletion. It does not currently provide a documented full-task editing workflow.

---

## 🔐 Security

Security-related implementation includes:

- **Password hashing:** Passwords are hashed with bcryptjs before storage.
- **Signed session tokens:** JOSE is used to sign and verify JWTs.
- **Session expiration:** Tokens have a defined expiration period.
- **HTTP-only cookies:** Session tokens are stored in cookies inaccessible to client-side JavaScript.
- **Cookie configuration:** The session cookie uses `SameSite=Lax` and the `Secure` flag in production.
- **Input validation:** Zod schemas validate authentication and task input.
- **Task ownership:** Private task operations check that tasks belong to the authenticated user.
- **Environment variables:** Database credentials and the JWT secret are configured on the server.

These measures demonstrate important security practices, but they should not be interpreted as a complete security audit or a claim that the application is production-hardened.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) — version 20.9 or later for Next.js 16
- npm
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)

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

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/taskflow?schema=public"
JWT_SECRET="YOUR_SECURE_SECRET"
```

Replace the database credentials with your local PostgreSQL configuration.

Generate a secure secret using Node.js:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Use the generated value for `JWT_SECRET`. The application expects a secret of at least 32 characters.

**Important:** Never commit `.env` files containing real credentials or secrets.

### 4. Create the Database

Create a local PostgreSQL database named `taskflow`, or configure `DATABASE_URL` to point to an existing database you can access.

For example:

```bash
createdb taskflow
```

### 5. Generate Prisma Client & Apply Migrations

The project uses the custom Prisma configuration file `prisma7.config.ts`.

Generate Prisma Client:

```bash
npx prisma generate --config prisma7.config.ts
```

Apply migrations:

```bash
npx prisma migrate dev --config prisma7.config.ts
```

These commands require a valid database connection and a correctly configured migration history. If the repository does not contain an initial migration, create and review one before applying migrations to a fresh database.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Code Quality

TaskFlow uses Vitest for automated tests focused on the authentication and task validation schemas.

The existing validation tests cover cases such as:

- Valid and invalid authentication data
- Email normalization
- Password validation
- Empty or excessively long task titles
- Valid task statuses
- Invalid task IDs

These tests focus on schema behavior; they do not represent complete end-to-end coverage of authentication, database operations, or the entire user interface.

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

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

Run these commands locally to verify the current environment. The presence of a command does not guarantee that every check passes on every machine.

---

## 🧗 Development Challenges & Solutions

### 🔐 Implementing Session-Based Authentication

Private task operations require a reliable way to identify the current user.

**Approach:**  
TaskFlow uses signed JWT session tokens, HTTP-only cookies, and server-side token verification to establish the current session.

### 🗄️ Connecting the API to Persistent Storage

Task data must remain available beyond a single browser session.

**Approach:**  
PostgreSQL provides persistent storage, while Prisma ORM manages database access through the application's configured adapter.

### 🛡️ Protecting User-Specific Tasks

Users should not be able to access or modify tasks belonging to other accounts.

**Approach:**  
Private task operations verify the session and check task ownership before accessing or modifying a task.

### ✅ Validating Incoming Data

Invalid input can lead to inconsistent data or unexpected API behavior.

**Approach:**  
Zod schemas validate authentication and task input before the application processes supported operations.

### 🗂️ Organizing the Kanban Workflow

Tasks need to remain aligned with their current workflow status.

**Approach:**  
The application uses the `TODO`, `IN_PROGRESS`, and `DONE` status values to organize tasks into the corresponding Kanban columns.

---

## 🔮 Future Improvements

The current version focuses on core task management, authentication, and persistence.

Potential future improvements include:

- Full editing of task titles and descriptions
- Updating task priorities through the interface
- Task search, filtering, and sorting
- More detailed success and error feedback
- Expanded API and database integration tests
- Additional accessibility improvements
- An `.env.example` file for easier setup
- Real application screenshots
- GitHub Actions for continuous integration
- Deployment with documented production configuration

These are possible future enhancements, not features currently claimed as implemented.

---

## 📚 What I Learned

TaskFlow provided practical experience connecting frontend interactions to backend logic and persistent database operations.

The project helped reinforce my understanding of:

- **Full-stack development** with Next.js App Router
- **React and TypeScript** for structured application interfaces
- **REST API design** and HTTP methods
- **Authentication** with JWT and HTTP-only cookies
- **Password security** with bcryptjs
- **Database integration** using PostgreSQL and Prisma ORM
- **Data validation** with Zod
- **Authorization** through user-specific ownership checks
- **Kanban workflows** and state-driven UI updates
- **Automated testing** with Vitest
- **Development quality checks** with ESLint and TypeScript

Most importantly, TaskFlow gave me practice treating a web application as a connected system in which the interface, API, authentication, validation, and database need to work together consistently.

---

## 👨‍💻 Author

<div align="center">

### Jean Ribeiro

**Junior Web Developer | Frontend & Full-Stack Development**

Brazil · Open to International Remote Opportunities

This project is part of my developer portfolio, where I practice modern web technologies and build practical applications to strengthen my frontend and full-stack development skills.

<br />

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=google-chrome&logoColor=white)](https://jeanribeiro8.github.io/JeanRibeiro/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JeanRibeiro8)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jean-ribeiro-9a3792267/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:jeanrsantos10@gmail.com)

</div>

---

<div align="center">

**TaskFlow** · Next.js + React + TypeScript + PostgreSQL

Built as a full-stack development portfolio project by **Jean Ribeiro**

</div>