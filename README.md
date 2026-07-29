# Embeddable Chat Widget Platform

A production-grade multi-tenant SaaS application that allows users to customize and embed chat widgets on their websites.

## Folder Structure

```text
chat-widget-platform/
├── client/                 # React (Vite + JS) Frontend
│   ├── src/
│   │   ├── assets/         # Static assets (images, logos)
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Layout wrappers (e.g., AppLayout)
│   │   ├── pages/          # Application views (Dashboard, Login, Settings, etc.)
│   │   ├── services/       # API call handlers (Axios client setup)
│   │   └── utils/          # Helper utilities
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js + Express + Sequelize Backend
│   ├── config/             # App & Database configurations
│   ├── controllers/        # Route controllers (request/response handling)
│   ├── middleware/         # Custom Express middleware (error handling, cors)
│   ├── migrations/         # Database migration scripts
│   ├── models/             # Sequelize database models
│   ├── routes/             # Express routing definitions
│   ├── seeders/            # Database seed scripts
│   ├── services/           # Core business logic layer
│   ├── utils/              # Utility scripts (db connection checks)
│   ├── validators/         # Input validation schemas (Zod)
│   ├── app.js              # Express app initialization
│   ├── server.js           # App listener and db-connection startup
│   ├── .sequelizerc        # Sequelize CLI configuration
│   ├── .env.example        # Reference environment configuration
│   └── package.json
├── .gitignore              # Monorepo gitignore
└── README.md               # Setup and development instructions
```

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- MySQL (v8 or higher recommended)

### Clone and Install Dependencies

First, clone this repository to your workspace. Then run the installations for both the `client` and `server`:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## MySQL Database Setup

1. Create a MySQL database for the project (e.g., `chat_widget_platform_dev`).
2. Make sure you have a local user with access rights to read and write to this database.

---

## Environment Variables

### Server (`server/.env`)

Create a `server/.env` file from the `server/.env.example` template:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MySQL Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=chat_widget_platform_dev
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT configuration
JWT_SECRET=super_secret_jwt_signing_key_change_me_in_production

# Frontend integration URL
NEXT_PUBLIC_APP_URL=http://localhost:5173
```

### Client (`client/.env`)

Create a `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Starting the Client

Runs the React development server using Vite:

```bash
cd client
npm run dev
```
By default, the client runs on `http://localhost:5173`.

### Starting the Server

Runs the Express server with nodemon for hot-reloads:

```bash
cd server
npm run dev
```
The server will start on the port configured in `.env` (default is `5000`), e.g., `http://localhost:5000`.

To start in production-style mode:
```bash
npm run start
```

---

## Migrations and Seeders

Run these commands in the `server` directory to prepare your database.

### Run Migrations
Applies all structural database changes (users, subscriptions, api keys, widget themes) to MySQL:
```bash
cd server
npm run migrate
```

### Run Seeders
Applies initial presets (such as widget theme presets like Ocean, Sunset, Forest, Midnight, Minimal):
```bash
npm run seed
```

### Reset Database
Rolls back all migrations, recreates tables, and runs seeders (warning: this drops all data):
```bash
npm run reset-db
```

---

## API Health Endpoint

To verify the Express server is up and database connection pool works, check:
`GET http://localhost:5000/api/health`

**Success Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## Development Workflow

1. Configure the database in the `server/.env` file.
2. Run `npm run migrate` and `npm run seed` inside the `server/` directory to construct the schema.
3. Start the Express backend: `npm run dev` in `server/`.
4. Verify server health at `http://localhost:5000/api/health`.
5. Start the React frontend: `npm run dev` in `client/`.
6. Navigate to `http://localhost:5173` to test screen routing.
