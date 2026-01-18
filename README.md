
# NetLink Enterprise Hub 🔗

![NetLink Banner](https://images.unsplash.com/photo-1550751827-44bd374c3f58b?auto=format&fit=crop&q=80&w=1200)

## 🚀 Local Setup (Sequelize Edition)

The project now uses **Sequelize ORM** for automated database management.

### 1. Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** installed locally.
- **VS Code Extension**: [PostgreSQL](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres).

### 2. Database Initialization
1. Open pgAdmin.
2. Create an empty database named `netlink-gs`.
3. **Important**: You do NOT need to run any SQL scripts. Sequelize will create all tables automatically when the server starts.

### Run with Docker (recommended)
1. Ensure Docker Desktop is installed and running.
2. From the `netlink-enterprise-hub` folder run:

```bash
docker-compose up -d
```

This will start a Postgres container and automatically apply `schema.sql` during initialization. The database will be available on `localhost:5432` with credentials from `.env.example`.

### Start backend
1. Copy `.env.example` to `.env` and adjust values if needed.
2. Install dependencies and start the backend:

```bash
cd netlink-enterprise-hub
npm install
npm run dev
```

The backend will connect to the Postgres instance started by Docker Compose.

### 3. Backend Setup
1. Configure `.env` with your Postgres password.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## ✨ Key Features
- **Sequelize ORM**: Type-safe database interactions and automated migrations.
- **Corporate Presence**: Interactive portfolio for CCTV, Software, and Infrastructure.
- **AI Support**: Gemini-powered virtual assistant.
- **Staff Control Room**: Real-time plan tracking and colleague mentions.

---
© 2024 NetLink General Solutions PLC. Designed for Excellence.
