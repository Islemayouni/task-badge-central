
import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface KanbanBoardProps {
  tasks: Task[];
  projectId: string;
  isManager: boolean;
  onAddTask?: (columnStatus: string) => void;
  onTaskStatusChange?: (taskId: string, newStatus: string) => void;
}

const KanbanBoard = ({ tasks, projectId, isManager, onAddTask, onTaskStatusChange }: KanbanBoardProps) => {
  const columns = [
    { id: 'à faire', title: 'À faire', color: 'bg-gray-200' },
    { id: 'en cours', title: 'En cours', color: 'bg-blue-200' },
    { id: 'fini', title: 'Terminé', color: 'bg-green-200' }
  ];

  const getTasksForColumn = (columnId: string) => {
    return tasks.filter(task => task.status === columnId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(column => (
        <div key={column.id} className="flex flex-col h-full">
          <div className={`rounded-t-md p-3 ${column.color} dark:bg-opacity-20 font-medium flex justify-between items-center`}>
            <div className="flex items-center">
              <span>{column.title}</span>
              <Badge variant="outline" className="ml-2 bg-white dark:bg-gray-800">
                {getTasksForColumn(column.id).length}
              </Badge>
            </div>
            {isManager && (
              <button
                onClick={() => onAddTask && onAddTask(column.id)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/30 rounded-b-md p-2 flex-1 space-y-3 min-h-[300px]">
            {getTasksForColumn(column.id).map(task => (
              <Card 
                key={task.id} 
                className="cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => isManager && onTaskStatusChange && onTaskStatusChange(task.id, column.id)}
              >
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-sm font-medium flex justify-between items-start">
                    <div>{task.title}</div>
                    <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                      {task.priority}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2 space-y-2 text-sm">
                  {task.description && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{task.description}</p>
                  )}
                  {task.assignee && (
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      {task.assignee.avatar ? (
                        <Avatar className="h-5 w-5 mr-1">
                          <img src={task.assignee.avatar} alt={task.assignee.name} />
                        </Avatar>
                      ) : (
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarFallback className="text-[10px]">{task.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <span>{task.assignee.name}</span>
                    </div>
                  )}
                  {task.dueDate && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
