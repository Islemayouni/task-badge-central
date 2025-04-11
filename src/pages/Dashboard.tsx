
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskCard from '@/components/tasks/TaskCard';
import BadgeCard from '@/components/badges/BadgeCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CheckCircle, ChevronRight, Clock, Plus } from 'lucide-react';

const Dashboard = () => {
  // Données de démonstration
  const recentTasks = [
    {
      id: 'TASK-1234',
      title: 'Implémenter la fonctionnalité de synchronisation avec JIRA',
      description: 'Connecter l\'API JIRA et importer les tickets existants',
      status: 'in-progress' as const,
      priority: 'high' as const,
      assignee: {
        name: 'Thomas Durand',
        avatar: 'https://github.com/shadcn.png',
      },
      dueDate: '2025-04-15',
      source: 'internal' as const,
    },
    {
      id: 'JIRA-5678',
      title: 'Corriger le bug d\'affichage sur la page des badges',
      status: 'to-do' as const,
      priority: 'medium' as const,
      dueDate: '2025-04-20',
      source: 'jira' as const,
    },
    {
      id: 'TASK-2345',
      title: 'Mise à jour de la documentation utilisateur',
      status: 'done' as const,
      priority: 'low' as const,
      assignee: {
        name: 'Marie Laurent',
      },
      source: 'internal' as const,
    },
  ];
  
  const recentBadges = [
    {
      id: 'badge-1',
      name: 'Super Productif',
      description: 'Complétez 50 tâches en un mois',
      image: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
      level: 2,
      maxLevel: 5,
      progress: 65,
      isUnlocked: true,
    },
    {
      id: 'badge-2',
      name: 'Expert JIRA',
      description: 'Complétez 30 tickets JIRA',
      image: 'https://cdn-icons-png.flaticon.com/512/6213/6213324.png',
      level: 1,
      maxLevel: 3,
      progress: 20,
      isUnlocked: true,
    },
    {
      id: 'badge-3',
      name: 'Maître des Délais',
      description: 'Complétez toutes vos tâches avant la date limite pendant 2 semaines',
      image: '',
      level: 0,
      maxLevel: 3,
      progress: 10,
      isUnlocked: false,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-jira-lightgray">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-1">Bonjour, Thomas</h1>
            <p className="text-jira-mediumgray">
              Voici un résumé de vos activités et progressions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle size={18} className="text-jira-blue" />
                  Tâches
                </CardTitle>
                <CardDescription>Résumé de vos tâches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-2xl font-semibold">12</div>
                    <div className="text-xs text-jira-mediumgray">À faire</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-2xl font-semibold">5</div>
                    <div className="text-xs text-jira-mediumgray">En cours</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-2xl font-semibold">8</div>
                    <div className="text-xs text-jira-mediumgray">Cette semaine</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-2xl font-semibold text-jira-green">28</div>
                    <div className="text-xs text-jira-mediumgray">Terminées</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award size={18} className="text-jira-purple" />
                  Badges
                </CardTitle>
                <CardDescription>Votre collection de badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="p-3 bg-white rounded-md border text-center">
                    <div className="text-2xl font-semibold text-jira-purple">5</div>
                    <div className="text-xs text-jira-mediumgray">Débloqués</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border text-center">
                    <div className="text-2xl font-semibold">2</div>
                    <div className="text-xs text-jira-mediumgray">Niveau max</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border text-center">
                    <div className="text-2xl font-semibold text-jira-blue">8</div>
                    <div className="text-xs text-jira-mediumgray">Total</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-jira-purple"></div>
                    ))}
                    {[4, 5].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-gray-200"></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock size={18} className="text-jira-yellow" />
                  À venir
                </CardTitle>
                <CardDescription>Échéances importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm font-medium">Réunion d'équipe</div>
                    <div className="text-xs text-jira-mediumgray">Aujourd'hui à 14:00</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm font-medium">Revue de sprint</div>
                    <div className="text-xs text-jira-mediumgray">Demain à 10:30</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm font-medium">Date limite: API JIRA</div>
                    <div className="text-xs text-jira-mediumgray">15/04 - Dans 4 jours</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="tasks" className="mb-6">
            <TabsList>
              <TabsTrigger value="tasks">Tâches récentes</TabsTrigger>
              <TabsTrigger value="badges">Badges récents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks">
              <div className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Vos dernières tâches</h2>
                  <a href="#" className="text-sm text-jira-blue flex items-center hover:underline">
                    Voir toutes
                    <ChevronRight size={16} />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentTasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                  ))}
                  
                  <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-jira-mediumgray h-full">
                    <Plus size={24} className="mb-2" />
                    <span className="text-sm">Créer une nouvelle tâche</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <div className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Vos badges récents</h2>
                  <a href="#" className="text-sm text-jira-blue flex items-center hover:underline">
                    Voir tous
                    <ChevronRight size={16} />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {recentBadges.map((badge) => (
                    <BadgeCard key={badge.id} {...badge} />
                  ))}
                  
                  <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-jira-mediumgray h-full">
                    <Award size={24} className="mb-2" />
                    <span className="text-sm">Explorer les badges</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
