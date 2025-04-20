
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  Award, 
  Star, 
  BarChart2, 
  Users, 
  Calendar, 
  Search,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardEmployee = () => {
  const [period, setPeriod] = useState("month");

  const performancePeriods = [
    { 
      value: "week", 
      label: "Cette semaine",
      data: [
        { name: 'Lun', completed: 3, inProgress: 2 },
        { name: 'Mar', completed: 2, inProgress: 1 },
        { name: 'Mer', completed: 4, inProgress: 3 },
        { name: 'Jeu', completed: 1, inProgress: 2 },
        { name: 'Ven', completed: 3, inProgress: 1 },
      ]
    },
    { 
      value: "month", 
      label: "Ce mois",
      data: [
        { name: 'S1', completed: 12, inProgress: 5 },
        { name: 'S2', completed: 15, inProgress: 3 },
        { name: 'S3', completed: 8, inProgress: 7 },
        { name: 'S4', completed: 18, inProgress: 4 },
      ]
    },
    { 
      value: "quarter", 
      label: "Ce trimestre",
      data: [
        { name: 'Jan', completed: 32, inProgress: 8 },
        { name: 'Fév', completed: 28, inProgress: 6 },
        { name: 'Mar', completed: 42, inProgress: 10 },
      ]
    },
  ];

  const badges = [
    { 
      id: "1", 
      name: "Débutant", 
      description: "A complété ses 5 premières tâches", 
      image: "/lovable-uploads/488db44b-e3e9-4505-afec-611b9123f2ba.png", 
      level: 3, 
      maxLevel: 3,
      progress: 100,
      isUnlocked: true,
      dateObtained: "2025-03-15",
    },
    { 
      id: "2", 
      name: "Performant", 
      description: "A complété 20 tâches en moins d'un mois", 
      image: "/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png", 
      level: 2, 
      maxLevel: 5,
      progress: 65,
      isUnlocked: true,
      dateObtained: "2025-04-02", 
    },
    { 
      id: "3", 
      name: "Expert", 
      description: "A complété 50 tâches au total", 
      image: "/lovable-uploads/930b5cde-c295-4f49-872b-0efc0d540584.png", 
      level: 1, 
      maxLevel: 3,
      progress: 40,
      isUnlocked: true,
      dateObtained: "2025-04-10",  
    }
  ];

  const recentTasks = [
    {
      id: "task1",
      title: "Corriger le bug d'authentification",
      status: 'fini',
      dueDate: "2025-04-15",
      priority: "high",
      source: "jira",
      completedDate: "2025-04-14",
    },
    {
      id: "task2",
      title: "Mettre à jour la documentation API",
      status: 'fini',
      dueDate: "2025-04-18",
      priority: "medium",
      source: "internal",
      completedDate: "2025-04-17",
    },
    {
      id: "task3",
      title: "Revoir les maquettes UX",
      status: 'en cours',
      dueDate: "2025-04-22",
      priority: "medium",
      source: "internal",
      progressPercent: 70,
    }
  ];
  
  const teamRanking = [
    { name: "Laura M.", position: 1, tasksCompleted: 87, badges: 12, avatar: "/lovable-uploads/be4748c1-9a46-4e46-8375-eadde6ef67da.png" },
    { name: "Thomas D.", position: 2, tasksCompleted: 82, badges: 10, avatar: "" },
    { name: "Vous", position: 3, tasksCompleted: 76, badges: 8, avatar: "https://github.com/shadcn.png", isCurrent: true },
    { name: "Sophie L.", position: 4, tasksCompleted: 74, badges: 9, avatar: "/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png" },
    { name: "Nicolas P.", position: 5, tasksCompleted: 68, badges: 7, avatar: "" },
  ];
  
  const nextBadge = {
    name: "Maestro",
    description: "Complétez 100 tâches au total",
    image: "/lovable-uploads/930b5cde-c295-4f49-872b-0efc0d540584.png",
    progress: 76,
    remaining: 24
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Mon Dashboard</h1>
              <p className="text-muted-foreground">
                Suivez vos performances et votre progression
              </p>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choisir une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="performance" className="rounded-lg flex items-center gap-2">
                <BarChart2 size={16} />
                Mes Performances
              </TabsTrigger>
              <TabsTrigger value="badges" className="rounded-lg flex items-center gap-2">
                <Award size={16} />
                Mes Badges
              </TabsTrigger>
              <TabsTrigger value="comparison" className="rounded-lg flex items-center gap-2">
                <Users size={16} />
                Comparaison
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Tâches Complétées"
                  value="42"
                  icon={CheckCircle}
                  trend={{ value: "+8", positive: true }}
                  description="ce mois"
                  variant="highlight"
                />
                
                <StatCard
                  title="Tâches en Cours"
                  value="7"
                  icon={Clock}
                  progress={45}
                />
                
                <StatCard
                  title="Badges Obtenus"
                  value="8"
                  icon={Award}
                  trend={{ value: "Niveau 3", positive: true }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PerformanceChart
                  data={performancePeriods.find(p => p.value === period)?.data || performancePeriods[0].data}
                  periods={performancePeriods}
                  title="Progression Mensuelle"
                  description="Nombre de tâches complétées par mois"
                />

                <Card className="hover:border-primary/30 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Prochain badge
                    </CardTitle>
                    <CardDescription>
                      Votre progression vers le prochain niveau
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <img src={nextBadge.image} alt={nextBadge.name} className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{nextBadge.name}</h3>
                          <p className="text-sm text-muted-foreground">{nextBadge.description}</p>
                          <div className="mt-2">
                            <Progress value={nextBadge.progress} className="h-2" />
                            <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                              <span>{nextBadge.progress}% complété</span>
                              <span>Reste {nextBadge.remaining} tâches</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Tâches récentes</h3>
                        {recentTasks.map((task) => (
                          <div key={task.id} className="p-3 border rounded-lg flex items-center hover:border-primary/30 transition-all">
                            <div className="mr-3">
                              {task.status === 'fini' ? (
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Clock className="h-4 w-4 text-amber-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h4 className="text-sm font-medium">{task.title}</h4>
                                <Badge 
                                  variant="outline" 
                                  className="ml-2"
                                >
                                  {task.source === 'jira' ? 'JIRA' : 'Interne'}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {task.status === 'fini' ? (
                                  <>Terminé le {new Date(task.completedDate!).toLocaleDateString('fr-FR')}</>
                                ) : (
                                  <>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</>
                                )}
                              </div>
                              {task.status === 'en cours' && task.progressPercent && (
                                <Progress value={task.progressPercent} className="h-1 mt-2" />
                              )}
                            </div>
                            <div className="ml-2 flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              {task.status !== 'fini' && (
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="badges" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Badges Obtenus"
                  value="8"
                  icon={Award}
                  variant="highlight"
                />
                
                <StatCard
                  title="Niveau Maximum"
                  value="3"
                  icon={Star}
                />
                
                <StatCard
                  title="Progression totale"
                  value="76%"
                  icon={Award}
                  progress={76}
                />
              </div>

              <Card className="hover:border-primary/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Collection de badges
                  </CardTitle>
                  <CardDescription>
                    Badges obtenus et progression vers les prochains niveaux
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map(badge => (
                      <div key={badge.id} className="card-gradient rounded-lg border p-4 hover-lift">
                        <div className="flex items-center mb-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <img src={badge.image} alt={badge.name} className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">{badge.name}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              Obtenu le {new Date(badge.dateObtained).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                        
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-medium">Niveau {badge.level}/{badge.maxLevel}</span>
                            <span className="text-xs text-muted-foreground">{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comparison" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Votre position"
                  value="#3"
                  icon={ThumbsUp}
                  trend={{ value: "+2", positive: true }}
                  description="ce mois"
                />
                
                <StatCard
                  title="Tâches (équipe)"
                  value="387"
                  icon={CheckCircle}
                />
                
                <StatCard
                  title="Votre contribution"
                  value="19.6%"
                  icon={Users}
                  progress={19.6}
                />
              </div>

              <Card className="hover:border-primary/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Classement de l'équipe
                  </CardTitle>
                  <CardDescription>
                    Performances comparées aux membres de votre équipe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamRanking.map((member, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg flex items-center ${
                          member.isCurrent 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'hover:bg-secondary/10 border border-transparent'
                        } transition-all`}
                      >
                        <div className="w-8 text-center font-bold text-lg mr-3">
                          #{member.position}
                        </div>
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium flex items-center">
                            {member.name}
                            {member.isCurrent && (
                              <Badge variant="secondary" className="ml-2 text-xs">Vous</Badge>
                            )}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {member.tasksCompleted} tâches
                            </span>
                            <span className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {member.badges} badges
                            </span>
                          </div>
                        </div>
                        <div className="ml-2">
                          {member.position === 1 && (
                            <div className="text-2xl">🏆</div>
                          )}
                          {member.position === 2 && (
                            <div className="text-2xl">🥈</div>
                          )}
                          {member.position === 3 && (
                            <div className="text-2xl">🥉</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:border-primary/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Comparaison détaillée
                  </CardTitle>
                  <CardDescription>
                    Vos performances par rapport à la moyenne de l'équipe
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    <p>Graphique de comparaison détaillée sera affiché ici</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DashboardEmployee;
