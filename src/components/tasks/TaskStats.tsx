
import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const TaskStats = () => {
  return (
    <div className="flex items-center gap-8 text-sm text-gray-500 mb-4">
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>Date limite proche: 2</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} />
        <span>Haute priorité: 1</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle size={16} />
        <span>Terminées cette semaine: 3</span>
      </div>
    </div>
  );
};

export default TaskStats;
