
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './database';
import { Employee, TaskPost, Comment, Report, NewsItem } from './models';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }) as any);

// Sync Database
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ NetLink Database synced via Sequelize');
}).catch(err => {
  console.error('❌ Database sync failed:', err);
});

// --- API ROUTES ---

// 1. Get All Employees
app.get('/api/employees', async (req, res) => {
  try {
    // Fix: Using type assertion to ensure findAll is recognized on the Employee model
    const employees = await (Employee as any).findAll({ order: [['createdAt', 'DESC']] });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// 2. Post Task Plan
app.post('/api/tasks', async (req, res) => {
  const { authorId, content } = req.body;
  try {
    // Fix: Using type assertion to ensure create is recognized on the TaskPost model
    const task = await (TaskPost as any).create({ author_id: authorId, content });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// 3. Like Task (Atomic Toggle)
app.post('/api/tasks/:id/like', async (req, res) => {
  const { userId } = req.body;
  const taskId = req.params.id;
  try {
    // Fix: Using type assertion to ensure findByPk is recognized on the TaskPost model
    const task = await (TaskPost as any).findByPk(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    let likes = (task as any).likes || [];
    if (likes.includes(userId)) {
      likes = likes.filter((id: string) => id !== userId);
    } else {
      likes.push(userId);
    }
    
    await task.update({ likes });
    res.json({ success: true, likes });
  } catch (err) {
    res.status(500).json({ error: 'Interaction failed' });
  }
});

// 4. Upload Report
app.post('/api/reports', async (req, res) => {
  const { employeeId, fileName, fileData } = req.body;
  try {
    // Fix: Using type assertion to ensure create is recognized on the Report model
    const report = await (Report as any).create({ 
      employee_id: employeeId, 
      file_name: fileName, 
      file_data: fileData 
    });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// 5. Get Global Feed (Includes Author Info)
app.get('/api/feed', async (req, res) => {
  try {
    // Fix: Using type assertion to ensure findAll is recognized on the TaskPost model
    const feed = await (TaskPost as any).findAll({
      include: [{ model: Employee, as: 'author', attributes: ['name', 'photo_url', 'role'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(feed);
  } catch (err) {
    res.status(500).json({ error: 'Feed sync failed' });
  }
});

app.listen(port, () => {
  console.log(`🚀 NetLink Backend running on http://localhost:${port}`);
});
