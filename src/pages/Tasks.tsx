import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskHeader from '@/components/tasks/TaskHeader';
import TaskSearch from '@/components/tasks/TaskSearch';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskStats from '@/components/tasks/TaskStats';

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
          <TaskHeader />
          <TaskSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <TaskGrid tasks={filteredTasks} />
          <div className="mt-8">
            <TaskStats />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
