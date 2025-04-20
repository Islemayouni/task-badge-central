
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, Users, BarChart2, Bell, Briefcase } from 'lucide-react';

const DashboardManager = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Dashboard Manager</h1>
              <p className="text-gray-500">Gérez votre équipe et suivez les performances</p>
            </div>
          </div>

          <Tabs defaultValue="team" className="space-y-4">
            <TabsList>
              <TabsTrigger value="team">Équipe</TabsTrigger>
              <TabsTrigger value="jira">Configuration JIRA</TabsTrigger>
              <TabsTrigger value="badges">Gestion des Badges</TabsTrigger>
              <TabsTrigger value="tasks">Types de Tâches</TabsTrigger>
            </TabsList>
            
            <TabsContent value="team" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total des Employés</CardDescription>
                    <CardTitle className="text-2xl">24</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <Users className="inline-block mr-1 h-4 w-4" />
                      5 équipes
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tâches en Cours</CardDescription>
                    <CardTitle className="text-2xl">47</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={65} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-2">
                      65% de complétion moyenne
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Badges Attribués</CardDescription>
                    <CardTitle className="text-2xl">128</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <Badge variant="secondary" className="mr-1">+12</Badge>
                      ce mois
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance des Équipes</CardTitle>
                  <CardDescription>Vue d'ensemble des performances par équipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart2 size={64} className="mx-auto mb-4 opacity-50" />
                      <p>Graphique des performances d'équipe</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Autres onglets... */}
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DashboardManager;
