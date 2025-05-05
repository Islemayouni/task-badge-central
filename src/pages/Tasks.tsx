
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskGrid from '@/components/tasks/TaskGrid';
import { type TaskProps } from '@/components/tasks/TaskCard';
import { useToast } from '@/components/ui/use-toast';

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.docId !== id));
    toast({
      title: "Tâche supprimée",
      description: `La tâche ${id} a été supprimée avec succès.`,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <TaskGrid onDelete={handleDeleteTask} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
