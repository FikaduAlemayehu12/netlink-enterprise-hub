
import React from 'react';
import { Network, Code, ShieldCheck, Cpu, Building2, Server, Smartphone, Globe, Lock, Workflow, BarChart3, Camera, Zap } from 'lucide-react';

export const SOCIAL_LINKS = {
  telegram: 'https://t.me/NetLink_General_Solutions',
  linkedin: 'https://www.linkedin.com/in/fikadu-alemayehu-9a526a291?fromQR=1',
  phone1: '+251910340909',
  phone2: '+251913671010',
  email: 'fikadualemayehu1437@gmail.com'
};

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES = [
  {
    id: 'networking',
    title: 'Enterprise Network & CCTV',
    description: 'Specializing in Hikvision CCTV systems, end-to-end network design, and advanced WLAN infrastructure.',
    icon: <Network className="w-8 h-8 text-blue-600" />,
    features: ['Hikvision CCTV Installation', 'Camera Configuration', 'SDN Solutions', 'Enterprise WLAN']
  },
  {
    id: 'software',
    title: 'Software Development',
    description: 'We develop any software project—from Web & Mobile apps to Government Systems and Enterprise ERPs.',
    icon: <Code className="w-8 h-8 text-green-600" />,
    features: ['Custom Web & Mobile', 'Government Portals', 'ERP & Business Systems', 'Cloud Solutions']
  },
  {
    id: 'electricity',
    title: 'Electrical & Finishing',
    description: 'Professional electrical installation, engineering design, and site finishing for commercial and government sites.',
    icon: <Zap className="w-8 h-8 text-yellow-600" />,
    features: ['Electrical System Design', 'Installation & Finishing', 'Power Backup Systems', 'Maintenance']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & SOC',
    description: 'Proactive defense and real-time monitoring. Protecting critical digital and physical assets.',
    icon: <ShieldCheck className="w-8 h-8 text-blue-700" />,
    features: ['SOC Operations', 'Endpoint Security', 'Access Management', 'Cyber Assessment']
  },
  {
    id: 'infrastructure',
    title: 'Smart Infrastructure',
    description: 'Structured cabling, IoT, and smart building systems designed for the future of Ethiopia.',
    icon: <Cpu className="w-8 h-8 text-green-700" />,
    features: ['Structured Cabling', 'IoT Integration', 'Smart Buildings', 'Tower Construction']
  },
  {
    id: 'datacenter',
    title: 'Data Center Facility',
    description: 'Full facility renovation, civil works, and mission-critical power/cooling management.',
    icon: <Server className="w-8 h-8 text-indigo-600" />,
    features: ['Facility Renovation', 'Cooling Solutions', 'Solar & Inverters', 'Power Systems']
  }
];

export const TEAM = [
  {
    name: 'Mr. Fikadu Alemayehu',
    role: 'Founder & CEO',
    image: 'https://picsum.photos/400/400?random=1',
    bio: 'Visionary leader with a passion for transforming Ethiopia through technological innovation.'
  },
  {
    name: 'Mr. Feyisa Bekele',
    role: 'Chief Technology Officer',
    image: 'https://picsum.photos/400/400?random=2',
    bio: 'Over 10 years of expertise in IT infrastructure and enterprise network solutions.'
  },
  {
    name: 'Mr. Ysak Alemayehu',
    role: 'Head of Business Development',
    image: 'https://picsum.photos/400/400?random=3',
    bio: 'Strategist driving partnerships and regional business growth initiatives.'
  },
  {
    name: 'Ms. Hana Alemu',
    role: 'Lead Software Engineer',
    image: 'https://picsum.photos/400/400?random=4',
    bio: 'Expert in developing innovative and scalable software solutions.'
  }
];

export const STATS = [
  { label: 'Certified Professionals', value: '20+' },
  { label: 'Years of Innovation', value: 'Found. 2024' },
  { label: 'Customer Satisfaction', value: '100%' },
  { label: 'Global Partners', value: '15+' }
];
