
import { Employee, Role, Department, Seniority, TaskStatus, InternalTask, Vendor, Project, NewsItem, PerformanceAward } from '../types';

const STORAGE_KEYS = {
  OWNER: 'netlink_owner_data',
  EMPLOYEES: 'netlink_employees',
  TASKS: 'netlink_tasks',
  VENDORS: 'netlink_vendors',
  PROJECTS: 'netlink_projects',
  NEWS: 'netlink_news',
  AWARDS: 'netlink_quarterly_awards'
};

/** 
 * Official Photo for Mr. Fikadu Alemayehu.
 * High-fidelity professional portrait.
 */
const CEO_PHOTO = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800";

export const generateEmployeeId = (index: number) => {
  const year = new Date().getFullYear();
  return `NGS-EMP-${year}-${(index + 1).toString().padStart(4, '0')}`;
};

export const generateCorporateCredentials = (fullName: string) => {
  const parts = fullName.toLowerCase().split(' ').filter(p => p.length > 0);
  const firstName = parts[0] || 'staff';
  const lastName = parts[1] || '';
  return {
    email: `${firstName}${lastName}@netlink-gs.com`,
    password: `${firstName}123`
  };
};

const getFromStorage = <T>(key: string, initial: T): T => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initial;
};

const saveToStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getEmployees = (): Employee[] => getFromStorage(STORAGE_KEYS.EMPLOYEES, [
  {
    id: 'NGS-EMP-2025-0001',
    name: 'Fikadu Alemayehu',
    email: 'fikadualemayehu@netlink-gs.com',
    password: 'fikadu123',
    role: 'CEO',
    department: 'Finance',
    seniority: 'Executive',
    photo: CEO_PHOTO,
    bio: 'Visionary founder and CEO focused on digital infrastructure across East Africa.',
    baseSalary: 150000,
    performanceScore: 100,
    status: 'Active',
    plans: { daily: '', weekly: '', monthly: '', quarterly: '' }
  }
]);

export const saveEmployees = (data: Employee[]) => saveToStorage(STORAGE_KEYS.EMPLOYEES, data);

export const getTasks = (): InternalTask[] => getFromStorage(STORAGE_KEYS.TASKS, [
  { id: 'TSK-001', title: 'Network Expansion Plan', status: 'To Do', assigneeId: 'NGS-EMP-2025-0001', priority: 'High', deadline: '2025-03-20' }
]);
export const saveTasks = (data: InternalTask[]) => saveToStorage(STORAGE_KEYS.TASKS, data);

export const getProjects = (): Project[] => getFromStorage(STORAGE_KEYS.PROJECTS, [
  { id: 'PRJ-101', name: 'Smart City Backbone', description: 'Enterprise core fiber networking.', leadId: 'NGS-EMP-2025-0001', status: 'In Progress', startDate: '2025-01-01', priority: 'High' }
]);
export const saveProjects = (data: Project[]) => saveToStorage(STORAGE_KEYS.PROJECTS, data);

export const getVendors = (): Vendor[] => getFromStorage(STORAGE_KEYS.VENDORS, [
  { id: 'VND-001', name: 'Global Network Inc', category: 'Hardware', contactPerson: 'Alex Reed', email: 'support@globalnet.com', status: 'Active', agreementDate: '2024-08-15' }
]);
export const saveVendors = (data: Vendor[]) => saveToStorage(STORAGE_KEYS.VENDORS, data);

export const getNews = (): NewsItem[] => getFromStorage(STORAGE_KEYS.NEWS, [
  { 
    id: 'NW-01', 
    title: 'Visual Innovation Hub', 
    content: 'Unveiling our new 4K High-Fidelity streaming core for nature and enterprise observation.',
    date: '2025-02-15',
    type: 'Poster',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    platformLinks: { telegram: 'https://t.me/NetLink_General_Solutions' }
  },
  { 
    id: 'NW-02', 
    title: 'Nature Connectivity', 
    content: 'Bringing the supernatural beauty of the wild to digital platforms with zero-lag streaming.',
    date: '2025-02-20',
    type: 'Ad',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800',
    platformLinks: { telegram: 'https://t.me/NetLink_General_Solutions' }
  }
]);
export const saveNews = (data: NewsItem[]) => saveToStorage(STORAGE_KEYS.NEWS, data);

export const getAwards = (): PerformanceAward[] => getFromStorage(STORAGE_KEYS.AWARDS, []);
export const saveAwards = (data: PerformanceAward[]) => saveToStorage(STORAGE_KEYS.AWARDS, data);

export const getOwnerData = () => getFromStorage(STORAGE_KEYS.OWNER, {
  name: 'Mr. Fikadu Alemayehu',
  role: 'Founder & CEO',
  bio: 'Transforming the digital landscape with high-fidelity visual technology and enterprise-grade infrastructure.',
  image: CEO_PHOTO
});
export const saveOwnerData = (data: any) => saveToStorage(STORAGE_KEYS.OWNER, data);
