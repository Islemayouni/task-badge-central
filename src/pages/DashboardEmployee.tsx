
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BadgeCard from '@/components/badges/BadgeCard';
import { CheckCircle, Award, BarChart2 } from 'lucide-react';

const DashboardEmployee = () => {
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
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Mon Dashboard</h1>
              <p className="text-gray-500">Suivez vos performances et votre progression</p>
            </div>
          </div>

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="performance">Mes Performances</TabsTrigger>
              <TabsTrigger value="badges">Mes Badges</TabsTrigger>
              <TabsTrigger value="comparison">Comparaison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tâches Complétées</CardDescription>
                    <CardTitle className="text-2xl">42</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium">+8</span> ce mois
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tâches en Cours</CardDescription>
                    <CardTitle className="text-2xl">7</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={45} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-2">
                      45% de complétion moyenne
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Badges Obtenus</CardDescription>
                    <CardTitle className="text-2xl">8</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Award className="h-4 w-4 mr-1 text-primary" />
                      Niveau 3 atteint
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progression Mensuelle</CardTitle>
                    <CardDescription>Nombre de tâches complétées par mois</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart2 size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Graphique de progression</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Derniers Badges</CardTitle>
                    <CardDescription>Vos badges récemment obtenus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {badges.map(badge => (
                        <div key={badge.id} className="flex items-center gap-4 p-3 bg-secondary/10 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <img src={badge.image} alt={badge.name} className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{badge.name}</h3>
                            <p className="text-sm text-gray-500">{badge.description}</p>
                          </div>
                          <Badge variant="secondary">
                            Niveau {badge.level}/{badge.maxLevel}
                          </Badge>
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

export default DashboardEmployee;
