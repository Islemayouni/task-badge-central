
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskGrid from '@/components/tasks/TaskGrid';

const Tasks = () => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    toast({
      title: "Tâche supprimée",
      description: `La tâche ${id} a été supprimée avec succès.`
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Modification de tâche",
      description: `Édition de la tâche ${id}.`
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Mes Tâches</h1>
            <TaskGrid onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
