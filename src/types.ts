export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'design' | 'other';
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'other';
}

export interface Skill {
  name: string;
  level: number; // 1 to 5
  category: string; // e.g., 'Languages', 'Frontend', 'Backend', 'Tools'
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  company?: string;
  tagline: string;
  aboutText: string;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  achievements: Achievement[];
  contact: ContactInfo;
  themeColor: string; // Tailwind hex or class name
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
