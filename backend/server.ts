
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

// Database Sync
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ NetLink Postgres Synced and Ready');
});

// API Routes
app.get('/api/users', UserController.getAll);
app.get('/api/users/:id', UserController.getProfile);
app.get('/api/reports', ReportController.getAll);
app.post('/api/reports', ReportController.submit);

app.listen(port, () => {
  console.log(`🚀 NetLink Server active on http://localhost:${port}`);
});
