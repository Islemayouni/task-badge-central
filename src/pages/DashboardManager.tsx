import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BarChart2, Award } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';

const DashboardManager = () => {
  const performanceData = [
    { name: 'Jan', completed: 45, inProgress: 20 },
    { name: 'Fév', completed: 52, inProgress: 18 },
    { name: 'Mar', completed: 38, inProgress: 25 },
    { name: 'Avr', completed: 65, inProgress: 15 },
  ];

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
          </div>

          <Tabs defaultValue="team" className="space-y-4">
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="team" className="rounded-lg">
                Équipe
              </TabsTrigger>
              <TabsTrigger value="jira" className="rounded-lg">
                Configuration JIRA
              </TabsTrigger>
              <TabsTrigger value="badges" className="rounded-lg">
                Gestion des Badges
              </TabsTrigger>
              <TabsTrigger value="tasks" className="rounded-lg">
                Types de Tâches
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="team" className="space-y-4 mt-6">
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
                />
                
                <StatCard
                  title="Badges Attribués"
                  value="128"
                  icon={Award}
                  trend={{ value: "+12", positive: true }}
                  description="ce mois"
                />
              </div>

              <PerformanceChart
                data={performanceData}
                title="Performance des Équipes"
                description="Vue d'ensemble des performances par équipe"
              />
            </TabsContent>
            
            {/* Autres onglets conservés pour plus tard */}
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DashboardManager;
