
import { Report, Employee } from '../models';

export const ReportController = {
  async submit(req: any, res: any) {
    const { userId, fileName, content } = req.body;
    try {
      const newReport = await (Report as any).create({
        user_id: userId,
        file_name: fileName,
        content
      });
      res.status(201).json(newReport);
    } catch (err) {
      res.status(400).json({ error: 'Submission Failed' });
    }
  },

  async getAll(req: any, res: any) {
    try {
      const reports = await (Report as any).findAll({
        include: [{ model: Employee, attributes: ['name', 'role'] }],
        order: [['date', 'DESC']]
      });
      res.json(reports);
    } catch (err) {
      res.status(500).json({ error: 'Fetch Error' });
    }
  }
};
