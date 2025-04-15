
import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard, { TaskProps } from './TaskCard';

interface TaskGridProps {
  tasks: TaskProps[];
}

const TaskGrid = ({ tasks }: TaskGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} {...task} />
      ))}
      
      <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors cursor-pointer">
        <Plus size={24} className="mb-2" />
        <span>Ajouter une nouvelle tâche</span>
      </div>
    </div>
  );
};

export default TaskGrid;
