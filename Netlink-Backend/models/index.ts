
import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Employee = sequelize.define('employee', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, defaultValue: 'General' },
  seniority: { type: DataTypes.STRING, defaultValue: 'Regular' },
  photo_url: { type: DataTypes.TEXT },
  base_salary: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 }
});

export const Performance = sequelize.define('performance', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  kpi: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const Report = sequelize.define('report', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  file_name: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Associations
Employee.hasMany(Performance, { foreignKey: 'user_id' });
Performance.belongsTo(Employee, { foreignKey: 'user_id' });

Employee.hasMany(Report, { foreignKey: 'user_id' });
Report.belongsTo(Employee, { foreignKey: 'user_id' });
