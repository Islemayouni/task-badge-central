
import React from 'react';  
import { Plus } from 'lucide-react';
import TaskCard, { TaskProps } from './TaskCard';
import { useToast } from "@/hooks/use-toast";

interface TaskGridProps {
  tasks: TaskProps[];
  onDelete?: (id: string) => void;
}

const TaskGrid = ({ tasks, onDelete }: TaskGridProps) => {
  const { toast } = useToast();
  console.log('Tâches rendues:', tasks);
  
  const handleAddClick = () => {
    // This function should trigger the popup in the parent component
    // We'll add a custom event that will be listened to in the Tasks.tsx file
    const event = new CustomEvent('openAddTaskPopup');
    window.dispatchEvent(event);
  };

  return (
    <div>
      {tasks && tasks.length > 0 ? (
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
          
          {/* Card pour ajouter une nouvelle tâche */}
          <div 
            onClick={handleAddClick}
            className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors cursor-pointer h-[220px]">
            <Plus size={24} className="mb-2" />
            <span>Ajouter une nouvelle tâche</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div
            onClick={handleAddClick}
            className="inline-flex items-center justify-center mb-4 px-6 py-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} className="mr-2" /> Nouvelle tâche
          </div>
          <p className="text-red-500 mt-8">Erreur lors de la création de la tâche</p>
        </div>
      )}
    </div>
  );
};

export default TaskGrid;
