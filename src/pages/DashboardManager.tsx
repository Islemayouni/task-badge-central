import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BarChart2, Award, List, Database, Settings, Calendar, Search, UserPlus } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateUserForm } from '@/components/users/CreateUserForm';

const DashboardManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  // Performance data with periods
  const performancePeriods = [
    { 
      value: "week", 
      label: "Cette semaine",
      data: [
        { name: 'Lun', completed: 8, inProgress: 5 },
        { name: 'Mar', completed: 12, inProgress: 3 },
        { name: 'Mer', completed: 7, inProgress: 6 },
        { name: 'Jeu', completed: 15, inProgress: 4 },
        { name: 'Ven', completed: 9, inProgress: 3 },
      ]
    },
    { 
      value: "month", 
      label: "Ce mois",
      data: [
        { name: 'S1', completed: 45, inProgress: 20 },
        { name: 'S2', completed: 52, inProgress: 18 },
        { name: 'S3', completed: 38, inProgress: 25 },
        { name: 'S4', completed: 65, inProgress: 15 },
      ]
    },
    { 
      value: "quarter", 
      label: "Ce trimestre",
      data: [
        { name: 'Jan', completed: 120, inProgress: 45 },
        { name: 'Fév', completed: 98, inProgress: 32 },
        { name: 'Mar', completed: 142, inProgress: 38 },
      ]
    },
  ];

  // Team members data
  const teamMembers = [
    { 
      id: "1", 
      name: "Sophie Martin", 
      role: "Développeur Frontend",
      avatar: "https://github.com/shadcn.png", 
      tasksCompleted: 24, 
      inProgress: 3, 
      badges: 5,
      department: "Web" 
    },
    { 
      id: "2", 
      name: "Thomas Dubois", 
      role: "Développeur Backend",
      avatar: "/lovable-uploads/488db44b-e3e9-4505-afec-611b9123f2ba.png", 
      tasksCompleted: 32, 
      inProgress: 5, 
      badges: 7,
      department: "API" 
    },
    { 
      id: "3", 
      name: "Laura Bernard", 
      role: "UX Designer",
      avatar: "/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png", 
      tasksCompleted: 18, 
      inProgress: 2, 
      badges: 4,
      department: "Design" 
    },
    { 
      id: "4", 
      name: "Nicolas Petit", 
      role: "DevOps",
      avatar: "", 
      tasksCompleted: 28, 
      inProgress: 1, 
      badges: 6,
      department: "Infra" 
    }
  ];

  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Badges configuration data
  const badgeTypes = [
    { 
      id: "1", 
      name: "Débutant", 
      description: "A complété ses 5 premières tâches", 
      threshold: 5,
      image: "/lovable-uploads/488db44b-e3e9-4505-afec-611b9123f2ba.png", 
      count: 15
    },
    { 
      id: "2", 
      name: "Performant", 
      description: "A complété 20 tâches en moins d'un mois", 
      threshold: 20,
      image: "/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png", 
      count: 8
    },
    { 
      id: "3", 
      name: "Expert", 
      description: "A complété 50 tâches au total", 
      threshold: 50,
      image: "/lovable-uploads/930b5cde-c295-4f49-872b-0efc0d540584.png", 
      count: 3
    }
  ];

  const handleOpenCreateUser = () => {
    console.log("Opening create user form");
    setIsCreateUserOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Dashboard Manager</h1>
              <p className="text-muted-foreground">
                Gérez votre équipe et suivez les performances
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" className="gap-2">
                <Calendar size={16} />
                <span>Exporter</span>
              </Button>
              <Button className="gap-2" onClick={handleOpenCreateUser}>
                <UserPlus size={16} />
                <span>Ajouter un utilisateur</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="team" className="space-y-4">
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="team" className="rounded-lg flex items-center gap-2">
                <Users size={16} />
                Équipe
              </TabsTrigger>
              <TabsTrigger value="jira" className="rounded-lg flex items-center gap-2">
                <Database size={16} />
                Configuration JIRA
              </TabsTrigger>
              <TabsTrigger value="badges" className="rounded-lg flex items-center gap-2">
                <Award size={16} />
                Gestion des Badges
              </TabsTrigger>
              <TabsTrigger value="tasks" className="rounded-lg flex items-center gap-2">
                <List size={16} />
                Types de Tâches
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="team" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Total des Employés"
                  value="24"
                  icon={Users}
                  description="5 équipes"
                  trend={{ value: "+3", positive: true }}
                />
                
                <StatCard
                  title="Tâches en Cours"
                  value="47"
                  progress={65}
                  icon={BarChart2}
                  variant="highlight"
                />
                
                <StatCard
                  title="Badges Attribués"
                  value="128"
                  icon={Award}
                  trend={{ value: "+12", positive: true }}
                  description="ce mois"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PerformanceChart
                    data={performancePeriods[0].data}
                    periods={performancePeriods}
                    title="Performance des Équipes"
                    description="Vue d'ensemble des performances par équipe"
                  />
                </div>
                
                <Card className="hover:border-primary/30 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Badges récemment attribués
                    </CardTitle>
                    <CardDescription>Derniers badges obtenus par l'équipe</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {teamMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center p-2 rounded-lg hover:bg-secondary/10 transition-all">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Award size={12} />
                          Expert
                        </Badge>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">Voir tous les badges</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="hover:border-primary/30 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Membres de l'équipe
                    </CardTitle>
                    <CardDescription>
                      Gérez les utilisateurs et consultez leurs performances
                    </CardDescription>
                  </div>
                  <div className="flex items-center relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Rechercher un membre..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Département</TableHead>
                          <TableHead className="text-center">Tâches terminées</TableHead>
                          <TableHead className="text-center">En cours</TableHead>
                          <TableHead className="text-center">Badges</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTeamMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{member.department}</Badge>
                            </TableCell>
                            <TableCell className="text-center">{member.tasksCompleted}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="secondary">{member.inProgress}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                {member.badges}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Award className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <BarChart2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="badges" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Total des Badges"
                  value={badgeTypes.length}
                  icon={Award}
                />
                
                <StatCard
                  title="Badges Attribués"
                  value="128"
                  icon={Award}
                  trend={{ value: "+12", positive: true }}
                  description="ce mois"
                />
                
                <StatCard
                  title="Badge le plus obtenu"
                  value="Débutant"
                  icon={Award}
                />
              </div>

              <Card className="hover:border-primary/30 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Configuration des badges
                    </CardTitle>
                    <CardDescription>
                      Gérez les badges et leurs conditions d'attribution
                    </CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Award size={16} />
                    <span>Nouveau badge</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badgeTypes.map((badge) => (
                      <Card key={badge.id} className="hover-lift overflow-hidden">
                        <div className="flex">
                          <div className="p-4 flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <img src={badge.image} alt={badge.name} className="h-6 w-6" />
                              </div>
                              <div>
                                <h3 className="font-medium">{badge.name}</h3>
                                <p className="text-xs text-muted-foreground">Seuil: {badge.threshold} tâches</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{badge.description}</p>
                            <div className="flex justify-between items-center mt-4">
                              <Badge variant="outline">
                                {badge.count} attribution{badge.count > 1 ? 's' : ''}
                              </Badge>
                              <div className="space-x-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jira" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Configuration de la connexion JIRA
                  </CardTitle>
                  <CardDescription>
                    Configurez l'intégration avec votre instance JIRA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL de l'instance JIRA</label>
                    <Input placeholder="https://your-domain.atlassian.net" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email ou nom d'utilisateur</label>
                    <Input placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Token API</label>
                    <Input type="password" placeholder="API Token" />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline">Tester la connexion</Button>
                    <Button>Enregistrer</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5 text-primary" />
                    Types de tâches
                  </CardTitle>
                  <CardDescription>
                    Configurez les différents types de tâches internes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Contenu de la configuration des types de tâches...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <CreateUserForm 
        open={isCreateUserOpen}
        onOpenChange={setIsCreateUserOpen}
        onUserCreated={(user) => {
          console.log("User created:", user);
          // Here you would typically update the team members list
          // with the newly created user
        }}
      />
    </div>
  );
};

export default DashboardManager;
