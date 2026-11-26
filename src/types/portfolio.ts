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

export interface ProjectCaseStudyChapter {
  title: string;
  subtitle?: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
}

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
  designProcess?: string;
  frontendArchitecture?: string;
  backendArchitecture?: string;
  databaseDesign?: string;
  apiIntegration?: string;
  paymentIntegration?: string;
  futureImprovements?: string[];
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

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  tag: string;
  problem: string;
  discovery: string;
  solution: string;
  improvement: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Storage' | 'Payments' | 'Deployment';
  role: string;
  tech: string;
  details: string;
  connections: string[];
}

export interface PaymentFlowStep {
  id: string;
  step: string;
  actor: string;
  title: string;
  action: string;
  technicalDetails: string;
  status: 'client' | 'network' | 'webhook' | 'db' | 'cloud';
}
