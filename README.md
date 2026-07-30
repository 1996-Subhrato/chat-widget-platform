# Embeddable Chat Widget Platform

A production-grade, multi-tenant SaaS application that allows users to customize, preview, and embed chat widgets on their websites.

> **Status**: **Phase 1 Completed** (Monorepo setup, Database Schema & Relational Models, Authentication Engine & HTTP-only JWT Sessions, React Frontend Routing & Auth Context).

---

## Phase 1 Accomplishments

During **Phase 1**, the core platform foundation and security layer were established:

1. **Monorepo Architecture**:
   - **Frontend**: Vite + React SPA with custom styling and client-side routing (`react-router-dom`).
   - **Backend**: Node.js + Express RESTful API server with security standard middleware (`helmet`, `cors`, `cookie-parser`, `morgan`).
2. **Database Foundation (MySQL + Sequelize ORM)**:
   - Configured migrations and seeders for relational database entities:
     - `Users`: Multi-tenant identity store with hashed credentials (`bcryptjs`).
     - `Subscriptions`: Multi-tier plan management (Free, Pro, Enterprise).
     - `ApiKeys`: Tenant API key provision & secret hash management.
     - `WidgetThemes`: Customizable visual themes and preset themes (Ocean, Sunset, Forest, Midnight, Minimal).
3. **Authentication & Session Security**:
   - HTTP-only, `SameSite` cookie-based JWT session flow to protect against XSS token theft.
   - Input validation pipeline powered by **Zod** (`signupSchema`, `loginSchema`).
   - Centralized authentication middleware (`authMiddleware`) for route protection.
4. **React Client Dashboard & Context**:
   - Global `AuthContext` managing user authentication states, persistent session rehydration on reload (`/api/auth/me`), and login/logout handling.
   - Component-level route guards (`ProtectedRoute`, `PublicRoute`).
   - Views implemented: Login, Signup, Onboarding, Dashboard, Widgets, Playground, and Settings.

---

## Folder Structure

```text
chat-widget-platform/
├── client/                 # React (Vite + JS) Frontend
│   ├── src/
│   │   ├── assets/         # Static assets & logos
│   │   ├── components/     # UI components (Navbar, ProtectedRoute, PublicRoute, etc.)
│   │   ├── context/        # React context providers (AuthContext)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # AppLayout and AuthLayout wrappers
│   │   ├── pages/          # Dashboard, Login, Signup, Onboarding, Widgets, Playground, Settings
│   │   ├── services/       # Axios API client setup (`withCredentials: true`)
│   │   └── utils/          # Helper utilities
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js + Express + Sequelize Backend
│   ├── config/             # Database connection & Sequelize configs
│   ├── controllers/        # Route controllers (authController)
│   ├── middleware/         # Express middleware (authMiddleware, CORS, error handler)
│   ├── migrations/         # Database migrations (users, subscriptions, api_keys, widget_themes)
│   ├── models/             # Sequelize models (User, Subscription, ApiKey, WidgetTheme)
│   ├── routes/             # Express API routes (authRoutes)
│   ├── seeders/            # Database seeders (preset widget themes)
│   ├── services/           # Business logic layer
│   ├── utils/              # Utility functions
│   ├── validators/         # Zod schema validators (authValidator)
│   ├── app.js              # Express app configuration & middleware pipeline
│   ├── server.js           # Server entry point & DB connection initialization
│   ├── .sequelizerc        # Sequelize CLI configuration
│   ├── .env.example        # Reference environment variables
│   └── package.json
├── .gitignore              # Monorepo gitignore
└── README.md               # Project documentation
```

---

## Environment Setup

### 1. Server Environment (`server/.env`)

Copy `server/.env.example` to `server/.env` and update your settings:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MySQL Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=chat_widget_platform_dev
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Authentication
JWT_SECRET=super_secret_jwt_signing_key_change_me_in_production

# Client App URL
NEXT_PUBLIC_APP_URL=http://localhost:5173
```

### 2. Client Environment (`client/.env`)

Create a `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation & Database Initialization

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 2. MySQL Database Setup

Ensure MySQL is running locally and create the database:

```sql
CREATE DATABASE chat_widget_platform_dev;
```

### 3. Run Migrations & Seeders

Run these commands inside the `server/` directory:

```bash
cd server

# Execute database migrations
npm run migrate

# Seed initial widget theme presets (Ocean, Sunset, Forest, Midnight, Minimal)
npm run seed
```

*Note: You can reset the database at any time using `npm run reset-db`.*

---

## Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```
The backend server runs on `http://localhost:5000` with hot-reload enabled via Nodemon.

### Start Frontend Client

```bash
cd client
npm run dev
```
The React development app runs on `http://localhost:5173`.

---

## Phase 1 API Documentation

### Health Check

- **`GET /api/health`**
  - **Description**: Verifies API server status and MySQL database connection pool status.
  - **Response (200 OK)**:
    ```json
    {
      "status": "ok",
      "database": "connected"
    }
    ```

### Authentication Endpoints

- **`POST /api/auth/signup`**
  - **Description**: Registers a new user and creates default tenant data.
  - **Request Body**:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "SecurePassword123!"
    }
    ```
  - **Response (201 Created)**: Sets an `httpOnly` JWT session cookie.
    ```json
    {
      "user": {
        "id": "uuid-v4",
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
    ```

- **`POST /api/auth/login`**
  - **Description**: Authenticates user credentials and issues an HTTP-only JWT cookie.
  - **Request Body**:
    ```json
    {
      "email": "jane@example.com",
      "password": "SecurePassword123!"
    }
    ```
  - **Response (200 OK)**:
    ```json
    {
      "user": {
        "id": "uuid-v4",
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
    ```

- **`POST /api/auth/logout`**
  - **Description**: Clears the authentication session cookie.
  - **Response (200 OK)**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **`GET /api/auth/me`**
  - **Description**: Retrieves the authenticated user profile using the HTTP-only session cookie.
  - **Headers**: Cookie-based authentication.
  - **Response (200 OK)**:
    ```json
    {
      "user": {
        "id": "uuid-v4",
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
    ```

---

## Next Steps (Phase 2 Roadmap)

- [ ] Widget Theme Customization API & Live Playground Editor
- [ ] Embeddable Lightweight JS Script (`widget.js`) for Third-party Sites
- [ ] Real-time Chat Gateway (WebSockets / Socket.io)
- [ ] Tenant API Key Generator & Management Interface
