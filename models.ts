
import { DataTypes } from 'sequelize';
import { sequelize } from './database';

// Fix: Using sequelize.define to ensure static methods like init, findAll, etc. are correctly recognized by TypeScript
export const Employee = sequelize.define('employee', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  seniority: { type: DataTypes.STRING, allowNull: false },
  photo_url: { type: DataTypes.TEXT },
  base_salary: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  performance_score: { type: DataTypes.INTEGER, defaultValue: 0 },
  performance_history: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
  current_plan: { type: DataTypes.TEXT },
  evaluation_frequency: { type: DataTypes.STRING, defaultValue: 'Monthly' }
});

// Fix: Defining TaskPost using sequelize.define
export const TaskPost = sequelize.define('task_post', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] }
});

// Fix: Defining Comment using sequelize.define
export const Comment = sequelize.define('comment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false }
});

// Fix: Defining Report using sequelize.define
export const Report = sequelize.define('report', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  file_name: { type: DataTypes.STRING, allowNull: false },
  file_data: { type: DataTypes.TEXT } // Base64
});

// Fix: Defining NewsItem using sequelize.define
export const NewsItem = sequelize.define('news_item', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.STRING, defaultValue: 'News' },
  author_name: { type: DataTypes.STRING }
});

// Associations
// Fix: Defining associations on the model objects returned by sequelize.define
Employee.hasMany(TaskPost, { foreignKey: 'author_id' });
TaskPost.belongsTo(Employee, { foreignKey: 'author_id', as: 'author' });

TaskPost.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(TaskPost, { foreignKey: 'post_id' });

Employee.hasMany(Comment, { foreignKey: 'author_id' });
Comment.belongsTo(Employee, { foreignKey: 'author_id', as: 'author' });

Employee.hasMany(Report, { foreignKey: 'employee_id' });
Report.belongsTo(Employee, { foreignKey: 'employee_id' });
