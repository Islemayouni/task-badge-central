
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskCard from '@/components/tasks/TaskCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Filter, 
  CheckCircle, 
  Clock, 
  CalendarDays,
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('deadline');

  const tasks = [
    {
      id: 'TASK-001',
      title: 'Implémenter l\'authentification OAuth',
      description: 'Mettre en place l\'authentification OAuth avec Google et GitHub',
      status: 'to-do' as const,
      priority: 'high' as const,
      assignee: {
        name: 'Thomas Durand',
        avatar: 'https://github.com/shadcn.png'
      },
      dueDate: '2025-04-20',
      source: 'internal' as const
    },
    {
      id: 'TASK-002',
      title: 'Optimiser les performances',
      description: 'Analyser et améliorer les temps de chargement des pages',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      assignee: {
        name: 'Marie Laurent'
      },
      dueDate: '2025-04-18',
      source: 'internal' as const
    },
    {
      id: 'TASK-003',
      title: 'Corriger le bug d\'affichage',
      status: 'done' as const,
      priority: 'low' as const,
      assignee: {
        name: 'Sophie Martin'
      },
      dueDate: '2025-04-15',
      source: 'internal' as const
    }
  ];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
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
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher une tâche..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Date limite</SelectItem>
                  <SelectItem value="priority">Priorité</SelectItem>
                  <SelectItem value="status">Statut</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} {...task} />
            ))}
            
            <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors cursor-pointer">
              <Plus size={24} className="mb-2" />
              <span>Ajouter une nouvelle tâche</span>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center gap-8 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Date limite proche: 2</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Haute priorité: 1</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Terminées cette semaine: 3</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
