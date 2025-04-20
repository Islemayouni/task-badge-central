
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BadgeCard from '@/components/badges/BadgeCard';
import { CheckCircle, Clock, AlertTriangle, Calendar, Users, Award, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Données de démonstration pour les tâches et les badges
  const taskStats = {
    total: 34,
    completed: 21,
    inProgress: 8,
    todo: 5,
    overdue: 2,
    completionRate: 62,
  };
  
  const recentTasks = [
    { id: 'TASK-001', title: 'Configuration de l\'environnement de développement', status: 'en cours', priority: 'high', dueDate: '2025-04-25' },
    { id: 'TASK-002', title: 'Conception de l\'interface utilisateur', status: 'à faire', priority: 'medium', dueDate: '2025-04-28' },
    { id: 'TASK-003', title: 'Revue du code de la v0.1', status: 'fini', priority: 'low', dueDate: '2025-04-15' },
  ];
  
  const badges = [
    { 
      id: "1", 
      name: "Débutant", 
      description: "A complété ses 5 premières tâches", 
      image: "/lovable-uploads/488db44b-e3e9-4505-afec-611b9123f2ba.png", 
      level: 1, 
      maxLevel: 3,
      progress: 100,
      isUnlocked: true 
    },
    { 
      id: "2", 
      name: "Performant", 
      description: "A complété 20 tâches en moins d'un mois", 
      image: "/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png", 
      level: 2, 
      maxLevel: 5,
      progress: 65,
      isUnlocked: true 
    },
    { 
      id: "3", 
      name: "Expert", 
      description: "A résolu des problèmes critiques", 
      image: "/lovable-uploads/be4748c1-9a46-4e46-8375-eadde6ef67da.png", 
      level: 1, 
      maxLevel: 5,
      progress: 20,
      isUnlocked: false 
    },
  ];

  const projects = [
    {
      id: "P001",
      nom: "Refonte Application Mobile",
      cleProjet: "APP-123",
      description: "Modernisation de l'application mobile pour les clients",
      categorie: "Développement",
      typeProjet: "Application",
      iconeUrl: "/lovable-uploads/20c9b8cf-e6ff-41dc-af0d-d2f48cacd49e.png",
      etat: "actif",
      chefDeProjet: {
        id: "U001",
        nom: "Durand",
        prenom: "Thomas",
        email: "thomas.durand@entreprise.com",
        role: "Chef de projet"
      },
      tachesTotal: 32,
      tachesTerminees: 18
    },
    {
      id: "P002",
      nom: "Amélioration Infrastructure",
      cleProjet: "INF-456",
      description: "Mise à jour de l'infrastructure serveur",
      categorie: "Infrastructure",
      typeProjet: "Maintenance",
      iconeUrl: "/lovable-uploads/930b5cde-c295-4f49-872b-0efc0d540584.png",
      etat: "en_pause",
      chefDeProjet: {
        id: "U002",
        nom: "Martin",
        prenom: "Sophie",
        email: "sophie.martin@entreprise.com",
        role: "Architecte système"
      },
      tachesTotal: 15,
      tachesTerminees: 7
    }
  ];
  
  // Obtenir la couleur en fonction de la priorité
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  // Obtenir l'icône et la couleur en fonction du statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'à faire': return <CheckCircle size={16} className="text-gray-500" />;
      case 'en cours': return <Clock size={16} className="text-blue-500" />;
      case 'fini': return <CheckCircle size={16} className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Tableau de bord</h1>
              <p className="text-gray-500">Bienvenue sur MyTasks4YOU, votre gestionnaire de tâches et de badges</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="performance">Performances</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {/* Statistiques des tâches */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tâches totales</CardDescription>
                    <CardTitle className="text-2xl">{taskStats.total}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium">+4</span> depuis la semaine dernière
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tâches terminées</CardDescription>
                    <CardTitle className="text-2xl">{taskStats.completed}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={taskStats.completionRate} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-2">
                      {taskStats.completionRate}% du total
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tâches en cours</CardDescription>
                    <CardTitle className="text-2xl">{taskStats.inProgress}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock size={14} className="mr-1 text-blue-500" />
                      Progression selon le planning
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tâches en retard</CardDescription>
                    <CardTitle className="text-2xl">{taskStats.overdue}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-red-500">
                      <AlertTriangle size={14} className="mr-1" />
                      Nécessite attention
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Tâches récentes et activité */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tâches récentes</CardTitle>
                    <CardDescription>Vos tâches les plus récentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTasks.map((task) => (
                        <div key={task.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(task.status)}
                            <div>
                              <div className="font-medium">{task.title}</div>
                              <div className="text-sm text-gray-500">{task.id}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <a href="/tasks" className="text-sm text-primary hover:underline">Voir toutes les tâches</a>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Badges récemment obtenus</CardTitle>
                    <CardDescription>Vos récompenses récentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {badges.filter(badge => badge.isUnlocked).slice(0, 2).map((badge) => (
                        <div key={badge.id} className="flex items-center p-3 rounded-lg border">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <img src={badge.image} alt={badge.name} className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-medium">{badge.name}</div>
                            <div className="text-xs text-gray-500">Niveau {badge.level}/{badge.maxLevel}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <a href="/badges" className="text-sm text-primary hover:underline">Voir tous les badges</a>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                  <Card key={project.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {project.iconeUrl && (
                            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                              <img src={project.iconeUrl} alt={project.nom} className="w-6 h-6" />
                            </div>
                          )}
                          <div>
                            <CardTitle>{project.nom}</CardTitle>
                            <CardDescription>{project.cleProjet}</CardDescription>
                          </div>
                        </div>
                        <Badge className={
                          project.etat === 'actif' ? 'bg-green-100 text-green-800 border-green-200' :
                          project.etat === 'en_pause' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }>
                          {project.etat === 'actif' ? 'Actif' : 
                           project.etat === 'en_pause' ? 'En pause' :
                           project.etat === 'terminé' ? 'Terminé' : 'Annulé'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">{project.description}</p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progression</span>
                        <span className="text-sm text-gray-500">
                          {Math.round((project.tachesTerminees / project.tachesTotal) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(project.tachesTerminees / project.tachesTotal) * 100} 
                        className="h-2 mb-4" 
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          Chef: {project.chefDeProjet.prenom} {project.chefDeProjet.nom}
                        </div>
                        <div>
                          {project.tachesTerminees}/{project.tachesTotal} tâches
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <a 
                        href={`/projects?id=${project.id}`} 
                        className="text-sm text-primary hover:underline"
                      >
                        Voir le projet
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="badges" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map(badge => (
                  <BadgeCard
                    key={badge.id}
                    id={badge.id}
                    name={badge.name}
                    description={badge.description}
                    image={badge.image}
                    level={badge.level}
                    maxLevel={badge.maxLevel}
                    progress={badge.progress}
                    isUnlocked={badge.isUnlocked}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance mensuelle</CardTitle>
                    <CardDescription>Nombre de tâches complétées par mois</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart2 size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Graphique de performance</p>
                        <p className="text-sm">Données de performance à venir</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Progression des badges</CardTitle>
                    <CardDescription>Progression vers le prochain niveau</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {badges.map(badge => (
                        <div key={badge.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Award size={16} className="mr-2 text-primary" />
                              <span className="font-medium">{badge.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              Niveau {badge.level}/{badge.maxLevel}
                            </span>
                          </div>
                          <Progress value={badge.progress} className="h-1.5" />
                          <p className="text-xs text-gray-500">
                            {badge.progress}% vers le niveau suivant
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
