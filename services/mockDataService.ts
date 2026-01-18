
export type Department = 'Software Engineering' | 'IT & Network' | 'Data Center & Facility' | 'Business Development' | 'Management';
export type Seniority = 'Junior' | 'Regular' | 'Senior' | 'Lead' | 'Executive';

export interface Reaction {
  emoji: string;
  count: number;
  users: string[]; // User IDs who reacted
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  timestamp: number;
}

export interface TaskPost {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  timestamp: number;
  likes: string[]; // User IDs who liked
  reactions: Reaction[];
  comments: Comment[];
}

export interface ReportRecord {
  id: string;
  name: string;
  timestamp: number;
  fileData?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: Department;
  seniority: Seniority;
  photo: string;
  baseSalary: number;
  performanceScore: number;
  performanceHistory: number[];
  plan: string;
  evaluationFrequency: 'Daily' | 'Weekly' | 'Monthly';
  dailyPlan?: string;
  reportsCount?: number;
  reports?: ReportRecord[];
  taskFeed?: TaskPost[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'News' | 'Event';
  author: string;
}

const STORAGE_KEYS = {
  OWNER: 'netlink_owner_data',
  EMPLOYEES: 'netlink_employees',
  NEWS: 'netlink_news_events',
  APPRECIATION: 'netlink_appreciation'
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const getOwnerData = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.OWNER);
  return saved ? JSON.parse(saved) : {
    name: 'Mr. Fikadu Alemayehu',
    role: 'Founder & CEO',
    bio: 'Visionary leader with a passion for transforming Ethiopia through technological innovation.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600'
  };
};

export const saveOwnerData = (data: any) => {
  localStorage.setItem(STORAGE_KEYS.OWNER, JSON.stringify(data));
};

export const getEmployees = (): Employee[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
  if (saved) return JSON.parse(saved);
  
  const initial: Employee[] = [
    { id: '1', name: 'Mr. Feyisa Bekele', role: 'CTO', department: 'Management', seniority: 'Executive', photo: 'https://i.pravatar.cc/150?u=1', baseSalary: 65000, performanceScore: 98, performanceHistory: [85, 90, 88, 95, 98], plan: 'Infrastructure Expansion 2024', evaluationFrequency: 'Monthly', reportsCount: 2, reports: [], taskFeed: [] },
    { id: '2', name: 'Ms. Hana Alemu', role: 'Lead Software Engineer', department: 'Software Engineering', seniority: 'Lead', photo: 'https://i.pravatar.cc/150?u=2', baseSalary: 55000, performanceScore: 95, performanceHistory: [92, 91, 94, 93, 95], plan: 'AI Integration Project', evaluationFrequency: 'Weekly', reportsCount: 1, reports: [], taskFeed: [] },
    { id: '3', name: 'Mr. Haftu', role: 'Full Stack Developer', department: 'Software Engineering', seniority: 'Senior', photo: 'https://i.pravatar.cc/150?u=3', baseSalary: 45000, performanceScore: 88, performanceHistory: [70, 75, 80, 85, 88], plan: 'Enterprise ERP Module', evaluationFrequency: 'Daily', reportsCount: 0, reports: [], taskFeed: [] },
    { id: '4', name: 'Mr. Fayera', role: 'Network Engineer', department: 'IT & Network', seniority: 'Senior', photo: 'https://i.pravatar.cc/150?u=4', baseSalary: 42000, performanceScore: 90, performanceHistory: [88, 89, 91, 88, 90], plan: 'Hikvision Site Rollout', evaluationFrequency: 'Weekly', reportsCount: 0, reports: [], taskFeed: [] },
    { id: '5', name: 'Mr. Endale', role: 'Facility Engineer', department: 'Data Center & Facility', seniority: 'Senior', photo: 'https://i.pravatar.cc/150?u=5', baseSalary: 40000, performanceScore: 85, performanceHistory: [80, 82, 81, 84, 85], plan: 'Cooling System Upgrade', evaluationFrequency: 'Monthly', reportsCount: 0, reports: [], taskFeed: [] }
  ];
  return initial;
};

export const saveEmployees = (employees: Employee[]) => {
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
};

export const getNews = (): NewsItem[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
  return saved ? JSON.parse(saved) : [
    { id: '1', title: 'New Hikvision Partnership', content: 'NetLink officially becomes an authorized premium partner for surveillance in Ethiopia.', date: '2024-05-20', type: 'News', author: 'Admin' },
    { id: '2', title: 'Smart City Initiative', content: 'Our team is launching a new network design project for urban centers.', date: '2024-06-01', type: 'Event', author: 'Comm Dept' }
  ];
};

export const saveNews = (news: NewsItem[]) => {
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
};

export const getAppreciation = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.APPRECIATION);
  return saved ? JSON.parse(saved) : {
    name: 'Ms. Hana Alemu',
    achievement: 'Excellence in Software Architecture & Ethics',
    period: 'Q2 2024',
    photo: 'https://i.pravatar.cc/300?u=2',
    timestamp: Date.now()
  };
};

export const saveAppreciation = (data: any) => {
  localStorage.setItem(STORAGE_KEYS.APPRECIATION, JSON.stringify(data));
};
