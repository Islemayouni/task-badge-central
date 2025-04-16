
import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface TaskStatsProps {
  deadlineSoon?: number;
  highPriority?: number;
  completedThisWeek?: number;
}

const TaskStats = ({ 
  deadlineSoon = 2, 
  highPriority = 1, 
  completedThisWeek = 3 
}: TaskStatsProps) => {
  return (
    <div className="flex items-center gap-8 text-sm text-gray-500 mb-4">
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>Date limite proche: {deadlineSoon}</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} />
        <span>Haute priorité: {highPriority}</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle size={16} />
        <span>Terminées cette semaine: {completedThisWeek}</span>
      </div>
    </div>
  );
};

export default TaskStats;
