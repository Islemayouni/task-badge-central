export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'À faire' | 'En cours' | 'Terminée'; // Aligner avec TaskCard.tsx et backend
  priority: 'Basse' | 'Moyenne' | 'Haute'; // Aligner avec TaskCard.tsx et backend
  assignee?: {
    name: string;
    avatar?: string;
    id: string;
  };
  createdBy?: string;
  createdDate: string;
  dueDate?: string;
  source: 'JIRA' | 'Interne'; // Aligner avec backend
  projectId: string;
  tags?: string[];
  commentCount?: number;
  attachments?: number;
  progressPercent?: number;
  docId?: string; // Ajout pour la suppression
}               