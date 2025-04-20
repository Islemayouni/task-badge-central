
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  Filter,
  Users,
  BarChart2,
  Mail,
  Phone,
  ChevronsUpDown,
  User,
  Award,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { User as UserType } from '@/types/project';

const Team = () => {
  const [activeView, setActiveView] = useState<'list' | 'performance'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Données de démonstration pour l'équipe
  const teamMembers: (UserType & { 
    role: string; 
    tasks: { completed: number; inProgress: number; total: number }; 
    badges: number;
    performance: number;
    joinDate: string;
    contact: { email: string; phone: string };
  })[] = [
    {
      id: "U001",
      nom: "Durand",
      prenom: "Thomas",
      email: "thomas.durand@entreprise.com",
      role: "Chef de projet",
      avatar: "https://github.com/shadcn.png",
      tasks: { completed: 42, inProgress: 8, total: 55 },
      badges: 12,
      performance: 92,
      joinDate: "2022-06-15",
      contact: { email: "thomas.durand@entreprise.com", phone: "+33 6 12 34 56 78" }
    },
    {
      id: "U002",
      nom: "Laurent",
      prenom: "Marie",
      email: "marie.laurent@entreprise.com",
      role: "Développeuse Frontend",
      avatar: "",
      tasks: { completed: 38, inProgress: 5, total: 47 },
      badges: 9,
      performance: 88,
      joinDate: "2022-09-10",
      contact: { email: "marie.laurent@entreprise.com", phone: "+33 6 23 45 67 89" }
    },
    {
      id: "U003",
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@entreprise.com",
      role: "Architecte système",
      avatar: "",
      tasks: { completed: 35, inProgress: 7, total: 49 },
      badges: 8,
      performance: 85,
      joinDate: "2022-07-22",
      contact: { email: "sophie.martin@entreprise.com", phone: "+33 6 34 56 78 90" }
    },
    {
      id: "U004",
      nom: "Dubois",
      prenom: "Marc",
      email: "marc.dubois@entreprise.com",
      role: "Développeur Backend",
      avatar: "",
      tasks: { completed: 31, inProgress: 4, total: 42 },
      badges: 7,
      performance: 82,
      joinDate: "2023-01-18",
      contact: { email: "marc.dubois@entreprise.com", phone: "+33 6 45 67 89 01" }
    },
    {
      id: "U005",
      nom: "Leclerc",
      prenom: "Julie",
      email: "julie.leclerc@entreprise.com",
      role: "UX/UI Designer",
      avatar: "",
      tasks: { completed: 29, inProgress: 6, total: 38 },
      badges: 6,
      performance: 79,
      joinDate: "2023-03-05",
      contact: { email: "julie.leclerc@entreprise.com", phone: "+33 6 56 78 90 12" }
    }
  ];
  
  // Filtrer les membres de l'équipe selon la recherche
  const filteredMembers = teamMembers.filter(member => 
    member.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Obtenir les initiales pour l'avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };
  
  // Trier les membres de l'équipe par performance
  const sortedByPerformance = [...filteredMembers].sort((a, b) => b.performance - a.performance);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Gestion d'Équipe</h1>
              <p className="text-gray-500">Gérez et suivez les performances de votre équipe</p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="sopra-red-gradient text-white gap-2">
                <Plus size={16} />
                Ajouter un membre
              </Button>
            </div>
          </div>
          
          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs 
              value={activeView} 
              onValueChange={(v) => setActiveView(v as 'list' | 'performance')} 
              className="w-full md:w-auto"
            >
              <TabsList>
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un membre..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter size={16} />
              </Button>
            </div>
          </div>
          
          {/* Vue liste des membres */}
          {activeView === 'list' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map(member => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-primary text-white">
                            {getInitials(member.prenom, member.nom)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{member.prenom} {member.nom}</h3>
                          <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle size={12} />
                              {member.tasks.completed} tâches
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Award size={12} />
                              {member.badges} badges
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Taux de complétion</span>
                          <span className="font-medium">{Math.round((member.tasks.completed / member.tasks.total) * 100)}%</span>
                        </div>
                        <Progress value={(member.tasks.completed / member.tasks.total) * 100} className="h-2" />
                      </div>
                      
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          <span className="hidden lg:inline">Email</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={14} />
                          <span className="hidden lg:inline">Téléphone</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={14} />
                          <span className="hidden lg:inline">Profil</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredMembers.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-1">Aucun membre trouvé</h3>
                  <p className="text-gray-500">Essayez d'autres termes de recherche ou ajoutez un nouveau membre</p>
                </div>
              )}
            </div>
          )}
          
          {/* Vue performance */}
          {activeView === 'performance' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance de l'Équipe</CardTitle>
                  <CardDescription>Classement des membres par taux de complétion des tâches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sortedByPerformance.map((member, index) => (
                      <div key={member.id} className="flex items-center gap-4">
                        <div className="font-semibold text-lg text-gray-400 w-6">{index + 1}</div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-primary text-white">
                            {getInitials(member.prenom, member.nom)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium">{member.prenom} {member.nom}</h3>
                            <span className="text-sm font-semibold">{member.performance}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Progress value={member.performance} className="h-2 flex-1" />
                            <div className="flex gap-2 ml-4">
                              <Badge variant="outline" className="gap-1">
                                <CheckCircle size={12} />
                                {member.tasks.completed}
                              </Badge>
                              <Badge variant="outline" className="gap-1">
                                <AlertCircle size={12} />
                                {member.tasks.inProgress}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User size={20} className="text-primary" />
                      Statistiques Individuelles
                    </CardTitle>
                    <CardDescription>Nombre de tâches complétées par membre</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart2 size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Graphique des statistiques individuelles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award size={20} className="text-primary" />
                      Badges par Équipe
                    </CardTitle>
                    <CardDescription>Distribution des badges entre les membres</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Users size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Graphique de distribution des badges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Team;
