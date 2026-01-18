
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './database';
import { UserController } from './controllers/UserController';
import { ReportController } from './controllers/ReportController';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }) as any);

// Sync Database
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ NetLink Database Ready');
});

// MVC Routes
app.get('/api/users', UserController.getAllUsers);
app.get('/api/users/:id', UserController.getUserById);
app.get('/api/reports', ReportController.getReports);

app.listen(port, () => {
  console.log(`🚀 NetLink Backend running on http://localhost:${port}`);
});
