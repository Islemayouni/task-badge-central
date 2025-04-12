
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { 
  Search, 
  Plus, 
  Filter, 
  CheckSquare, 
  Clock, 
  AlertTriangle,
  MoreHorizontal, 
  ArrowUpDown,
  Calendar,
  UserPlus,
  CheckCircle 
} from 'lucide-react';

// Types pour notre application de gestion de projets
type TaskStatus = 'à faire' | 'en cours' | 'fini';

type Task = {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  status: TaskStatus;
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<'tableau' | 'liste'>('tableau');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Données de démonstration pour les tâches
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'TASK-001',
      title: 'Configuration de l\'environnement de développement',
      description: 'Installer et configurer tous les outils nécessaires',
      assignee: 'Thomas Durand',
      priority: 'high',
      dueDate: '2025-04-20',
      status: 'en cours'
    },
    {
      id: 'TASK-002',
      title: 'Conception de l\'interface utilisateur',
      description: 'Créer des maquettes pour toutes les pages principales',
      assignee: 'Marie Laurent',
      priority: 'medium',
      dueDate: '2025-04-18',
      status: 'à faire'
    },
    {
      id: 'TASK-003',
      title: 'Implémentation de l\'authentification',
      description: 'Intégrer le module de connexion et d\'inscription',
      assignee: 'Thomas Durand',
      priority: 'high',
      dueDate: '2025-04-15',
      status: 'à faire'
    },
    {
      id: 'TASK-004',
      title: 'Revue du code de la v0.1',
      description: 'Vérifier la qualité et les performances du code',
      assignee: 'Sophie Martin',
      priority: 'low',
      dueDate: '2025-04-12',
      status: 'fini'
    },
    {
      id: 'TASK-005',
      title: 'Tests d\'intégration',
      description: 'Écrire et exécuter les tests pour les fonctionnalités critiques',
      assignee: 'Marc Dubois',
      priority: 'medium',
      dueDate: '2025-04-25',
      status: 'à faire'
    }
  ]);

  // Filtrer les tâches selon la recherche
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Grouper les tâches par statut
  const tasksByStatus = {
    'à faire': filteredTasks.filter(t => t.status === 'à faire'),
    'en cours': filteredTasks.filter(t => t.status === 'en cours'),
    'fini': filteredTasks.filter(t => t.status === 'fini')
  };

  // Rendu de la carte d'une tâche
  const TaskCard = ({ task }: { task: Task }) => {
    // Fonction pour déterminer la couleur selon la priorité
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'high': return 'text-red-500';
        case 'medium': return 'text-amber-500';
        case 'low': return 'text-green-500';
        default: return 'text-gray-500';
      }
    };

    return (
      <Card className="mb-3 p-3 hover:shadow-md transition-shadow bg-white border border-gray-200 rounded-md">
        <div className="flex justify-between items-start">
          <span className="text-xs text-jira-mediumgray">{task.id}</span>
          <div className={`${getPriorityColor(task.priority)} text-xs flex items-center`}>
            <AlertTriangle size={12} className="mr-1" />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </div>
        </div>
        <h3 className="font-medium mt-1 mb-2">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-jira-darkgray mb-3 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            {task.assignee && (
              <div className="h-6 w-6 rounded-full bg-jira-blue text-white flex items-center justify-center text-xs">
                {task.assignee.split(' ').map(name => name[0]).join('')}
              </div>
            )}
          </div>
          {task.dueDate && (
            <div className="text-xs text-jira-darkgray flex items-center">
              <Calendar size={12} className="mr-1" />
              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-jira-lightgray">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* En-tête de la page des projets */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Développement App Mobile</h1>
              <div className="flex items-center text-jira-mediumgray text-sm">
                <span className="mr-3">Projet: APP-123</span>
                <span>Lead: Thomas Durand</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="sopra-red-gradient text-white">
                <Plus size={16} className="mr-2" />
                Créer une tâche
              </Button>
              <Button variant="outline">
                <UserPlus size={16} className="mr-2" />
                Inviter
              </Button>
            </div>
          </div>
          
          {/* Navigation entre tableau et liste */}
          <div className="flex justify-between items-center mb-4 border-b">
            <div className="flex space-x-1">
              <button 
                className={`px-4 py-2 ${activeTab === 'tableau' ? 'border-b-2 border-jira-blue text-jira-blue font-medium' : 'text-jira-mediumgray'}`} 
                onClick={() => setActiveTab('tableau')}
              >
                Tableau
              </button>
              <button 
                className={`px-4 py-2 ${activeTab === 'liste' ? 'border-b-2 border-jira-blue text-jira-blue font-medium' : 'text-jira-mediumgray'}`}
                onClick={() => setActiveTab('liste')}
              >
                Liste
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9 w-64" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
          </div>
          
          {activeTab === 'tableau' && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* Colonne des tâches à faire */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-jira-blue" />
                    <h2 className="font-medium">À faire</h2>
                    <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">{tasksByStatus['à faire'].length}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="space-y-2">
                  {tasksByStatus['à faire'].map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Colonne des tâches en cours */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-jira-yellow" />
                    <h2 className="font-medium">En cours</h2>
                    <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">{tasksByStatus['en cours'].length}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="space-y-2">
                  {tasksByStatus['en cours'].map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Colonne des tâches terminées */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-jira-green" />
                    <h2 className="font-medium">Fini</h2>
                    <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">{tasksByStatus['fini'].length}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="space-y-2">
                  {tasksByStatus['fini'].map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'liste' && (
            <div className="rounded-md border bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[300px]">
                      <div className="flex items-center">
                        Titre
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </TableHead>
                    <TableHead>Assigné à</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Date limite</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.assignee || '-'}</TableCell>
                      <TableCell>
                        <div className={`flex items-center ${
                          task.priority === 'high' ? 'text-red-500' : 
                          task.priority === 'medium' ? 'text-amber-500' : 'text-green-500'
                        }`}>
                          <AlertTriangle size={14} className="mr-1" />
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('fr-FR') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          task.status === 'à faire' ? 'bg-gray-100 text-gray-800' :
                          task.status === 'en cours' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {task.status === 'à faire' && <CheckSquare size={12} className="mr-1" />}
                          {task.status === 'en cours' && <Clock size={12} className="mr-1" />}
                          {task.status === 'fini' && <CheckCircle size={12} className="mr-1" />}
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;
