
export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  level: number;
  maxLevel: number;
  progress: number;
  isUnlocked: boolean;
  conditions?: {
    type: 'tasks_closed' | 'time_efficiency' | 'quality' | 'custom';
    threshold: number;
    period?: string;
  };
}
