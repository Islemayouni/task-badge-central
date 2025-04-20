
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Download,
  Filter,
  PieChart,
  Calendar,
  Users,
  Tag,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Reports = () => {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
  // Données de démonstration pour les rapports
  const performanceData = {
    tasksCompleted: 42,
    tasksInProgress: 15,
    tasksPending: 7,
    completionRate: 68,
    previousPeriod: {
      tasksCompleted: 38,
      completionRate: 62
    }
  };
  
  const teamPerformance = [
    { name: "Thomas Durand", tasksCompleted: 28, completionRate: 82 },
    { name: "Marie Laurent", tasksCompleted: 22, completionRate: 76 },
    { name: "Sophie Martin", tasksCompleted: 18, completionRate: 64 },
    { name: "Marc Dubois", tasksCompleted: 16, completionRate: 59 },
    { name: "Julie Leclerc", tasksCompleted: 15, completionRate: 52 }
  ];
  
  const projectPerformance = [
    { name: "Refonte Application Mobile", completed: 68, inProgress: 22, pending: 10 },
    { name: "Amélioration Infrastructure", completed: 45, inProgress: 35, pending: 20 },
    { name: "Intégration API", completed: 90, inProgress: 10, pending: 0 },
    { name: "Optimisation Base de Données", completed: 32, inProgress: 48, pending: 20 }
  ];
  
  const taskDistribution = {
    byPriority: [
      { name: "Haute", count: 15, color: "text-red-500" },
      { name: "Moyenne", count: 28, color: "text-amber-500" },
      { name: "Basse", count: 21, color: "text-green-500" }
    ],
    bySource: [
      { name: "JIRA", count: 32, color: "text-blue-500" },
      { name: "Interne", count: 32, color: "text-purple-500" }
    ],
    byStatus: [
      { name: "À Faire", count: 7, color: "text-gray-500" },
      { name: "En Cours", count: 15, color: "text-blue-500" },
      { name: "Terminée", count: 42, color: "text-green-500" }
    ]
  };
  
  // Formater la période
  const getPeriodLabel = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
    
    switch (dateRange) {
      case 'week':
        return 'Cette semaine';
      case 'month':
        return formatter.format(now);
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `T${quarter} ${now.getFullYear()}`;
      case 'year':
        return now.getFullYear().toString();
      default:
        return '';
    }
  };
  
  // Obtenir la tendance par rapport à la période précédente
  const getTrend = (current: number, previous: number) => {
    const diff = current - previous;
    return {
      value: diff,
      percentage: Math.round((diff / previous) * 100),
      positive: diff >= 0
    };
  };
  
  const taskCompletionTrend = getTrend(
    performanceData.tasksCompleted,
    performanceData.previousPeriod.tasksCompleted
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Rapports</h1>
              <p className="text-gray-500">Analysez les performances et suivez la progression</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Filtrer
              </Button>
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Exporter
              </Button>
            </div>
          </div>
          
          {/* Sélecteur de période */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Période : {getPeriodLabel()}</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={dateRange === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('week')}
              >
                Semaine
              </Button>
              <Button
                variant={dateRange === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('month')}
              >
                Mois
              </Button>
              <Button
                variant={dateRange === 'quarter' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('quarter')}
              >
                Trimestre
              </Button>
              <Button
                variant={dateRange === 'year' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('year')}
              >
                Année
              </Button>
            </div>
          </div>
          
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tâches terminées</CardDescription>
                <CardTitle className="text-2xl">{performanceData.tasksCompleted}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <span className={taskCompletionTrend.positive ? 'text-green-500' : 'text-red-500'}>
                    {taskCompletionTrend.positive ? '+' : ''}{taskCompletionTrend.value} ({taskCompletionTrend.percentage}%)
                  </span>
                  {' '}par rapport à la période précédente
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tâches en cours</CardDescription>
                <CardTitle className="text-2xl">{performanceData.tasksInProgress}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {Math.round((performanceData.tasksInProgress / (performanceData.tasksCompleted + performanceData.tasksInProgress + performanceData.tasksPending)) * 100)}% du total des tâches
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tâches en attente</CardDescription>
                <CardTitle className="text-2xl">{performanceData.tasksPending}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {Math.round((performanceData.tasksPending / (performanceData.tasksCompleted + performanceData.tasksInProgress + performanceData.tasksPending)) * 100)}% du total des tâches
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Taux de complétion</CardDescription>
                <CardTitle className="text-2xl">{performanceData.completionRate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={performanceData.completionRate} className="h-2" />
                <div className="text-xs text-muted-foreground mt-2">
                  <span className={performanceData.completionRate > performanceData.previousPeriod.completionRate ? 'text-green-500' : 'text-red-500'}>
                    {performanceData.completionRate > performanceData.previousPeriod.completionRate ? '+' : ''}
                    {performanceData.completionRate - performanceData.previousPeriod.completionRate}%
                  </span>
                  {' '}par rapport à la période précédente
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Onglets de rapports */}
          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>
            
            {/* Performance générale */}
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Générale</CardTitle>
                  <CardDescription>Tâches complétées au cours du temps</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart2 size={64} className="mx-auto mb-4 opacity-50" />
                      <p>Visualisation graphique de la performance</p>
                      <p className="text-sm">Graphique interactif montrant l'évolution des tâches terminées</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Performance de l'équipe */}
            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance de l'Équipe</CardTitle>
                  <CardDescription>Classement des membres de l'équipe par tâches complétées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamPerformance.map((member, index) => (
                      <div key={member.name} className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{index + 1}.</span>
                            <span>{member.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Badge>{member.tasksCompleted} tâches</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={member.completionRate} className="h-2 flex-1" />
                          <span className="text-sm text-gray-500">{member.completionRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Performance des projets */}
            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance des Projets</CardTitle>
                  <CardDescription>Avancement des projets actifs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projectPerformance.map(project => (
                      <div key={project.name} className="space-y-2">
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="bg-green-500 h-full" 
                            style={{ width: `${project.completed}%` }}
                          />
                          <div 
                            className="bg-blue-500 h-full" 
                            style={{ width: `${project.inProgress}%` }}
                          />
                          <div 
                            className="bg-gray-300 h-full" 
                            style={{ width: `${project.pending}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Complétées: {project.completed}%</span>
                          <span>En cours: {project.inProgress}%</span>
                          <span>En attente: {project.pending}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Distribution des tâches */}
            <TabsContent value="distribution" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag size={20} className="text-primary" />
                      Par Priorité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {taskDistribution.byPriority.map(item => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${item.color}`}>{item.name}</span>
                            <span className="text-sm text-gray-500">{item.count} tâches</span>
                          </div>
                          <Progress value={(item.count / taskDistribution.byPriority.reduce((acc, curr) => acc + curr.count, 0)) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center">
                        <PieChart size={48} className="text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar size={20} className="text-primary" />
                      Par Source
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {taskDistribution.bySource.map(item => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${item.color}`}>{item.name}</span>
                            <span className="text-sm text-gray-500">{item.count} tâches</span>
                          </div>
                          <Progress value={(item.count / taskDistribution.bySource.reduce((acc, curr) => acc + curr.count, 0)) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center">
                        <PieChart size={48} className="text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users size={20} className="text-primary" />
                      Par Statut
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {taskDistribution.byStatus.map(item => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${item.color}`}>{item.name}</span>
                            <span className="text-sm text-gray-500">{item.count} tâches</span>
                          </div>
                          <Progress value={(item.count / taskDistribution.byStatus.reduce((acc, curr) => acc + curr.count, 0)) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center">
                        <PieChart size={48} className="text-gray-400" />
                      </div>
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

export default Reports;
