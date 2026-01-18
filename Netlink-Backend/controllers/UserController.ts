
import { Employee, Performance } from '../models/index';

export const UserController = {
  async getAllUsers(req: any, res: any) {
    try {
      const users = await (Employee as any).findAll({
        include: [{ model: Performance, limit: 10, order: [['date', 'DESC']] }]
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  async getUserById(req: any, res: any) {
    try {
      const user = await (Employee as any).findByPk(req.params.id, { include: [Performance] });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};
