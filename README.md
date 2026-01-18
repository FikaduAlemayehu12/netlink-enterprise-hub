
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
