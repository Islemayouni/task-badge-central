
import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TaskHeaderProps {
  projectName?: string;
  projectId?: string;
  showBackButton?: boolean;
}

const TaskHeader = ({ projectName = "Mes tâches", projectId, showBackButton = false }: TaskHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/projects">
              <ArrowLeft size={18} />
            </Link>
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-semibold mb-1">{projectName}</h1>
          <p className="text-gray-500">
            {projectId ? `Projet: ${projectId}` : 'Gérez et suivez vos tâches en cours'}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default TaskHeader;
