
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, AlertCircle, CheckCircle, ArrowUpRight, Trash2 } from 'lucide-react';

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
}

const TaskCard: React.FC<TaskCardProps> = ({
  docId,  
  id,
  title,
  description,
  status,
  priority,
  assignee,
  dueDate,
  source,
  onDelete
}) => {
  const renderStatusBadge = () => {
    switch (status) {
      case 'À faire':
        return <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">À faire</Badge>;
      case 'En cours':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">En cours</Badge>;
      case 'Terminée':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Terminée</Badge>;
      default:
        return null;
    }
  };
  
  const renderPriorityIcon = () => {
    switch (priority) {
      case 'Haute':
        return <AlertCircle size={14} className="text-red-500" />;
      case 'Moyenne':
        return <AlertCircle size={14} className="text-amber-500" />;
      case 'Basse':
        return <AlertCircle size={14} className="text-green-500" />;
      default:
        return null;
    }
  };
  
  const renderSourceBadge = () => {
    switch (source) {
      case 'jira':
        return <Badge className="bg-blue-100/10 text-blue-700 hover:bg-blue-100/10 text-xs">JIRA</Badge>;
      case 'internal':
        return <Badge className="bg-purple-100/10 text-purple-700 hover:bg-purple-100/10 text-xs">INTERNE</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {renderSourceBadge()}
          <span className="text-xs text-gray-500">{id}</span>
        </div>
        <div className="flex items-center gap-2">
          {status === 'Terminée' && <CheckCircle size={16} className="text-green-500" />}
          {onDelete && docId && (
            <button
              onClick={() => onDelete(docId)}
              className="text-red-500 hover:text-red-700"
              title="Supprimer la tâche"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>  
      </div>
    
      <h3 className="font-medium mb-1.5 line-clamp-2">{title}</h3>
      
      {description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          {renderStatusBadge()}
          <span className="flex items-center gap-1 text-xs text-gray-600">
            {renderPriorityIcon()}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {dueDate && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} />
              {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
          
          {assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback className="text-[10px] bg-blue-500 text-white">
                {assignee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
      
      {source === 'jira' && (
        <div className="mt-3 pt-2 border-t flex justify-end">
          <a href="#" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
            Voir dans Jira
            <ArrowUpRight size={12} />
          </a>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
