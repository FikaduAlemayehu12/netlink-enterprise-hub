
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Fixed: Explicitly cast express.json() to any to resolve the TypeScript overload mismatch error 
// where 'NextHandleFunction' was being compared to 'PathParams'.
app.use(express.json({ limit: '50mb' }) as any);

// Postgres Pool Connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'netlink-gs',
  password: '1437faf@',
  port: 5432,
});

// Test DB Connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Successfully connected to NetLink Postgres DB');
  release();
});

// --- API ROUTES ---

// 1. Get All Employees
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// 2. Post Task Plan
app.post('/api/tasks', async (req, res) => {
  const { authorId, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO task_posts (author_id, content) VALUES ($1, $2) RETURNING *',
      [authorId, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// 3. Like Task
app.post('/api/tasks/:id/like', async (req, res) => {
  const { userId } = req.body;
  const taskId = req.params.id;
  try {
    // This logic handles toggling the like in Postgres
    await pool.query(`
      UPDATE task_posts 
      SET likes = CASE 
        WHEN $1 = ANY(likes) THEN array_remove(likes, $1)
        ELSE array_append(likes, $1)
      END
      WHERE id = $2
    `, [userId, taskId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Interaction failed' });
  }
});

// 4. Upload Report
app.post('/api/reports', async (req, res) => {
  const { employeeId, fileName, fileData } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reports (employee_id, file_name, file_data) VALUES ($1, $2, $3) RETURNING *',
      [employeeId, fileName, fileData]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// 5. Get Global Feed
app.get('/api/feed', async (req, res) => {
  try {
    const query = `
      SELECT tp.*, e.name as author_name, e.photo_url as author_photo 
      FROM task_posts tp
      JOIN employees e ON tp.author_id = e.id
      ORDER BY tp.timestamp DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Feed sync failed' });
  }
});

app.listen(port, () => {
  console.log(`NetLink Backend running on http://localhost:${port}`);
});
