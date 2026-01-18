
# NetLink Enterprise Hub 🔗

![NetLink Banner](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200)

## 🚀 Local Setup & Database "Cloning"

To get the database and backend running on your local machine via VS Code:

### 1. Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** installed locally.
- **VS Code Extension**: Install the [PostgreSQL](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres) extension to manage data without leaving your editor.

### 2. Database Initialization
1. Open pgAdmin or your terminal.
2. Create a database named `netlink-gs`.
3. Run the following command in your VS Code terminal to "clone" the structure:
   ```bash
   psql -U postgres -d netlink-gs -f schema.sql
   ```
   *(Password: 1437faf@)*

### 3. Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## ✨ Key Features

### 🏢 Corporate Presence
- **Dynamic Services Portfolio:** Interactive exploration of IT, Software, and Infrastructure solutions.
- **AI Assistant:** Integrated Gemini 3 Flash model for real-time customer support.
- **Hikvision Visibility:** Optimized hero section ensuring partner posters are high-visibility and unclipped.

### 📊 Staff Management (Internal)
- **Granular Access Control:** Role-based permissions (Admin, Officer, Employee).
- **Control Room Feed:** A real-time "Jira-style" activity feed where staff post daily plans and mention colleagues using `@name@netlink-gs.com`.
- **Performance Intelligence:** Interactive SVG "Velocity Sparklines" visualizing employee KPI trends.

## 🛡️ Security & Roles
- **Admin:** `admin@netlink-gs.com` / `admin123`
- **Officer:** `officer@netlink-gs.com` / `officer123`
- **Employee:** `firstname@netlink-gs.com` / `password123`

---
© 2024 NetLink General Solutions PLC. Designed for Excellence.
