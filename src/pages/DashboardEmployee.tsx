
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Award, Star } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const DashboardEmployee = () => {
  const performanceData = [
    { name: 'Jan', completed: 12, inProgress: 5 },
    { name: 'Fév', completed: 15, inProgress: 3 },
    { name: 'Mar', completed: 8, inProgress: 7 },
    { name: 'Avr', completed: 18, inProgress: 4 },
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
    }
  ];

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
          </div>

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="performance" className="rounded-lg">
                Mes Performances
              </TabsTrigger>
              <TabsTrigger value="badges" className="rounded-lg">
                Mes Badges
              </TabsTrigger>
              <TabsTrigger value="comparison" className="rounded-lg">
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
                  data={performanceData}
                  title="Progression Mensuelle"
                  description="Nombre de tâches complétées par mois"
                />

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Derniers Badges
                    </CardTitle>
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
                            <p className="text-sm text-muted-foreground">{badge.description}</p>
                            <Progress value={badge.progress} className="h-1.5 mt-2" />
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
