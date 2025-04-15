
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TaskHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Mes tâches</h1>
        <p className="text-gray-500">
          Gérez et suivez vos tâches en cours
        </p>
      </div>
      <Button className="sopra-red-gradient text-white">
        <Plus size={16} className="mr-2" />
        Nouvelle tâche
      </Button>
    </div>
  );
};

export default TaskHeader;
