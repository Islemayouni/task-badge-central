
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, AlertCircle, CheckCircle, ArrowUpRight } from 'lucide-react';

export type TaskStatus = 'to-do' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
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
}

const TaskCard: React.FC<TaskProps> = ({
  id,
  title,
  description,
  status,
  priority,
  assignee,
  dueDate,
  source
}) => {
  const renderStatusBadge = () => {
    switch (status) {
      case 'to-do':
        return <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">À faire</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">En cours</Badge>;
      case 'done':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Terminée</Badge>;
      default:
        return null;
    }
  };
  
  const renderPriorityIcon = () => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={14} className="text-jira-red" />;
      case 'medium':
        return <AlertCircle size={14} className="text-jira-yellow" />;
      case 'low':
        return <AlertCircle size={14} className="text-jira-green" />;
      default:
        return null;
    }
  };
  
  const renderSourceBadge = () => {
    switch (source) {
      case 'jira':
        return <Badge className="bg-jira-blue/10 text-jira-blue hover:bg-jira-blue/10 text-xs">JIRA</Badge>;
      case 'internal':
        return <Badge className="bg-jira-purple/10 text-jira-purple hover:bg-jira-purple/10 text-xs">INTERNE</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="jira-task bg-white border rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {renderSourceBadge()}
          <span className="text-xs text-jira-mediumgray">{id}</span>
        </div>
        {status === 'done' && <CheckCircle size={16} className="text-jira-green" />}
      </div>
      
      <h3 className="font-medium mb-1.5 line-clamp-2">{title}</h3>
      
      {description && (
        <p className="text-sm text-jira-darkgray mb-3 line-clamp-2">
          {description}
        </p>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          {renderStatusBadge()}
          <span className="flex items-center gap-1 text-xs text-jira-darkgray">
            {renderPriorityIcon()}
            {/* <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span> */}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {dueDate && (
            <span className="flex items-center gap-1 text-xs text-jira-mediumgray">
              <Clock size={12} />
              {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
          
          {assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback className="text-[10px] bg-jira-blue text-white">
                {assignee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
      
      {source === 'jira' && (
        <div className="mt-3 pt-2 border-t flex justify-end">
          <a href="#" className="flex items-center gap-1 text-xs text-jira-blue hover:underline">
            Voir dans Jira
            <ArrowUpRight size={12} />
          </a>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
