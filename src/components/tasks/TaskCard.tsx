
import React from 'react';
import { Badge } from '@/components/ui/badge';
<<<<<<< HEAD
import { Trash2, Edit } from 'lucide-react';
=======
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, AlertCircle, CheckCircle, ArrowUpRight, Trash2, Edit2 } from 'lucide-react';
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)

// Ajout de l'import de l'interface Task depuis task.ts
import { Task } from '../../types/task';

<<<<<<< HEAD
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
=======
//export type TaskStatus = 'À faire' | 'En cours' | 'Terminée';
//export type TaskPriority = 'Basse' | 'Moyenne' | 'Haute';   
//export type TaskSource = 'jira' | 'internal';

// export interface TaskProps {
//   id: string;
//   title: string;                                
//   description?: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   assignee?: {
//     name: string;
//     avatar?: string;
//   };
//   dueDate?: string;
//   source: TaskSource;
//   docId?: string; // Ajout de docId comme propriété optionnelle
// }

// Modification de l'interface TaskCardProps pour étendre Task
interface TaskCardProps extends Task { 
  onDelete?: (id: string) => void; // Nouvelle prop pour la suppression
  onEdit?: (task: Task) => void;
  // Ajout de la prop onAction pour gérer les actions spécifiques
  onAction?: (taskId: string, action: string) => void;
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
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
<<<<<<< HEAD
  onEdit
}) => {
  // Format the date to display as DD/MM/YYYY
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
=======
  onEdit,
  // Ajout de onAction dans les props déstructurées
  onAction,
  createdBy, // Ajouté mais non utilisé
  createdDate, // Ajouté mais non utilisé
  projectId, // Ajouté mais non utilisé
  tags, // Ajouté mais non utilisé
  commentCount, // Ajouté mais non utilisé
  attachments, // Ajouté mais non utilisé
  progressPercent // Ajouté mais non utilisé
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
        return <AlertCircle size={14} className="text-jira-red" />;
      case 'Moyenne':
        return <AlertCircle size={14} className="text-jira-yellow" />;
      case 'Basse':
        return <AlertCircle size={14} className="text-jira-green" />;
      default:
        return null;
    }
  };
  
  const renderSourceBadge = () => {
    switch (source) {
      case 'JIRA':
        return <Badge className="bg-jira-blue/10 text-jira-blue hover:bg-jira-blue/10 text-xs">JIRA</Badge>;
      case 'Interne':
        return <Badge className="bg-jira-purple/10 text-jira-purple hover:bg-jira-purple/10 text-xs">INTERNE</Badge>;
      default:
        return null;
    }
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
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
<<<<<<< HEAD
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
=======
        <div className="flex items-center gap-2">
          {status === 'Terminée' && <CheckCircle size={16} className="text-green-500" />}
          {onEdit && (
            <button
              onClick={() => onEdit({ docId, id, title, description, status, priority, assignee, dueDate, source, createdBy, createdDate, projectId, tags, commentCount, attachments, progressPercent })}
              className="text-blue-500 hover:text-blue-700"
              title="Modifier la tâche"
            >
              <Edit2 size={16} />
            </button>
          )}
          {onDelete && docId &&(
            <button
              onClick={() => onDelete(docId)} // utiliser docId ici 
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          )}
<<<<<<< HEAD
        </div>
=======
          {/* Ajout d'un bouton pour afficher les détails ou actions */}
          {onAction && (
            <button
              onClick={() => onAction(docId, 'view')}
              className="text-purple-500 hover:text-purple-700"
              title="Voir les détails/actions"
            >
              <ArrowUpRight size={16} />
            </button>
          )}
        </div>  
        
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
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
<<<<<<< HEAD
=======
      
      {source === 'JIRA' && (
        <div className="mt-3 pt-2 border-t flex justify-end">
          <a href="#" className="flex items-center gap-1 text-xs text-jira-blue hover:underline">
            Voir dans Jira
            <ArrowUpRight size={12} />
          </a>
        </div>
      )}
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
    </div>
  );
};

export default TaskCard;
