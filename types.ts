
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}