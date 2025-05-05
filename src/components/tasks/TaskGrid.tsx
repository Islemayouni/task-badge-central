
import React from 'react';  
import { Plus } from 'lucide-react';
import TaskCard, { TaskProps } from './TaskCard';

interface TaskGridProps {
  tasks: TaskProps[];
  onDelete?: (id: string) => void;
}

const TaskGrid = ({ tasks, onDelete }: TaskGridProps) => {
  console.log('Tâches rendues:', tasks);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <TaskCard
          key={task.docId || task.id}
          docId={task.docId}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          priority={task.priority}
          assignee={task.assignee}
          dueDate={task.dueDate}
          source={task.source}
          onDelete={onDelete}
        />
      ))}
      
      <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors cursor-pointer">
        <Plus size={24} className="mb-2" />
        <span>Ajouter une nouvelle tâche</span>
      </div>
    </div>
  );
};

export default TaskGrid;
