
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit } from 'lucide-react';

export type TaskStatus = 'À faire' | 'En cours' | 'Terminée';
export type TaskPriority = 'Basse' | 'Moyenne' | 'Haute';
export type TaskSource = 'jira' | 'internal';

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  source: TaskSource;
  docId?: string;
}
interface TaskCardProps extends TaskProps {
  docId?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  docId,  
  id,
  title,
  description,
  status,
  dueDate,
  source,
  onDelete,
  onEdit
}) => {
  // Format the date to display as DD/MM/YYYY
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 relative">
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center">
          <div className="text-xs text-gray-500">{id}</div>
          {source === 'jira' && (
            <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs px-2 py-0.5">
              Jira
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button 
              onClick={() => onEdit(docId || '')}
              className="text-blue-500 hover:text-blue-700"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(docId || '')}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      
      {description && (
        <p className="text-sm text-gray-600 mb-3">
          {description}
        </p>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div>
          <Badge className={`
            ${status === 'À faire' ? 'bg-gray-100 text-gray-700' : 
              status === 'En cours' ? 'bg-blue-100 text-blue-700' : 
              'bg-green-100 text-green-700'} hover:bg-opacity-90
          `}>
            {status}
          </Badge>
        </div>
        
        {dueDate && (
          <div className="text-xs text-gray-500">
            {formatDate(dueDate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
