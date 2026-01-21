
import React from 'react';

export type Role = 'CEO' | 'HR' | 'Senior Engineer' | 'Mid-level Engineer' | 'Junior Staff';
export type Department = 'Network' | 'Security' | 'Software' | 'Sales' | 'Finance' | 'Marketing';
export type Seniority = 'Executive' | 'Senior' | 'Mid' | 'Junior' | 'Fresh';
export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Done';
export type AccountStatus = 'Active' | 'Deactivated' | 'Archived';

export interface InternalTask {
  id: string;
  title: string;
  status: TaskStatus;
  assigneeId: string;
  priority: 'Low' | 'Medium' | 'High';
  deadline: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  leadId: string;
  status: 'In Planning' | 'In Progress' | 'Maintenance' | 'Completed';
  startDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Vendor {
  id: string;
  name: string;
  category: 'Hardware' | 'Software' | 'Surveillance' | 'Cabling';
  contactPerson: string;
  email: string;
  status: 'Active' | 'Under Review' | 'Terminated';
  agreementDate: string;
  description?: string;
}

export interface PerformanceAward {
  employeeId: string;
  message: string;
  quarter: string;
  incentiveType: string;
  timestamp: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  department: Department;
  seniority: Seniority;
  photo: string;
  bio: string;
  cvUrl?: string;
  baseSalary: number;
  performanceScore: number;
  status: AccountStatus;
  plans: {
    daily: string;
    weekly: string;
    monthly: string;
    quarterly: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  type: 'News' | 'Event' | 'Poster' | 'Ad';
  platformLinks: {
    telegram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
