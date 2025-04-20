
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'à faire' | 'en cours' | 'fini';
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    name: string;
    avatar?: string;
    id: string;
  };
  createdBy?: string;
  createdDate: string;
  dueDate?: string;
  source: 'jira' | 'internal';
  projectId: string;
  tags?: string[];
  commentCount?: number;
  attachments?: number;
  progressPercent?: number;
}
