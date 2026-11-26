export type ThemeMode = 'dark' | 'light';

export interface TimelineMilestone {
  id: string;
  index: string;
  title: string;
  reflection: string;
}

export interface ProjectArchitectureStep {
  layer: string;
  component: string;
  role: string;
}

export type ProjectCategory = 'Platform' | 'Brand & Studio' | 'Client & Demo';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  image: string;
  imageAlt: string;
  summary: string;
  narrative: string;
  stack: string[];
  problem: string;
  idea: string;
  approach: string;
  challenges: string[];
  learned: string;
  outcome: string;
  architecture?: ProjectArchitectureStep[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface ToolItem {
  name: string;
  status: 'used' | 'learning';
  note: string;
}

export interface ToolGroup {
  label: string;
  items: ToolItem[];
}

export interface ChapterLink {
  id: string;
  index: string;
  label: string;
}
