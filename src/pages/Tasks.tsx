
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskGrid from '@/components/tasks/TaskGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BadgesView from '@/components/badges/BadgesView';

const Tasks = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('tasks');

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
            <Tabs defaultValue="tasks" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl">
                <TabsTrigger value="tasks" className="rounded-lg">
                  Mes Tâches
                </TabsTrigger>
                <TabsTrigger value="badges" className="rounded-lg">
                  Mes Badges
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks">
                <TaskGrid onDelete={handleDelete} onEdit={handleEdit} />
              </TabsContent>
              
              <TabsContent value="badges">
                <BadgesView />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
