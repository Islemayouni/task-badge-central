
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskHeader from '@/components/tasks/TaskHeader';
import TaskStats from '@/components/tasks/TaskStats';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const Tasks = () => {
  const { toast } = useToast();
  const [showJiraTasks, setShowJiraTasks] = useState(true);

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

  const handleAddTask = () => {
    toast({
      title: "Nouvelle tâche",
      description: "Formulaire de création de tâche ouvert."
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <TaskHeader />
              <Button className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2" onClick={handleAddTask}>
                <Plus size={18} /> Nouvelle tâche
              </Button>
            </div>

            <TaskStats 
              deadlineSoon={3}
              highPriority={4}
              completedThisWeek={5}
            />
            
            <TaskGrid onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
