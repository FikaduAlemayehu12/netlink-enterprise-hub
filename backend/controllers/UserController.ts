
import { Employee, PerformanceMetric } from '../models';

export const UserController = {
  async getAll(req: any, res: any) {
    try {
      const users = await (Employee as any).findAll({
        include: [{ model: PerformanceMetric, limit: 10, order: [['date', 'DESC']] }]
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'DB Fetch Error' });
    }
  },

  async getProfile(req: any, res: any) {
    try {
      const user = await (Employee as any).findByPk(req.params.id, {
        include: [PerformanceMetric]
      });
      if (!user) return res.status(404).json({ error: 'User Not Found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
