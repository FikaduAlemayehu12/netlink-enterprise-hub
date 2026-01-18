
import { DataTypes } from 'sequelize';
import { sequelize } from './database';

export const Employee = sequelize.define('employee', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, defaultValue: 'General' },
  seniority: { type: DataTypes.STRING, defaultValue: 'Regular' },
  photo_url: { type: DataTypes.TEXT },
  base_salary: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  performance_score: { type: DataTypes.INTEGER, defaultValue: 80 }
});

export const Report = sequelize.define('report', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  file_name: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const TaskPost = sequelize.define('task_post', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] }
});

export const PerformanceMetric = sequelize.define('performance', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  kpi: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Relationships
Employee.hasMany(Report, { foreignKey: 'user_id' });
Report.belongsTo(Employee, { foreignKey: 'user_id' });

Employee.hasMany(TaskPost, { foreignKey: 'author_id' });
TaskPost.belongsTo(Employee, { foreignKey: 'author_id', as: 'author' });

Employee.hasMany(PerformanceMetric, { foreignKey: 'user_id' });
PerformanceMetric.belongsTo(Employee, { foreignKey: 'user_id' });
