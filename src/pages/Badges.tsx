
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BadgeCard from '@/components/badges/BadgeCard';
import { Award, Search } from 'lucide-react';

const Badges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Données de démonstration pour les badges
  const allBadges = [
    { 
      id: "1", 
      name: "Débutant", 
      description: "A complété ses 5 premières tâches", 
      image: "/lovable-uploads/488db44b-e3e9-4505-afec-611b9123f2ba.png", 
      level: 1, 
      maxLevel: 3,
      progress: 100,
      isUnlocked: true,
      category: "progression"
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
      category: "performance"
    },
    { 
      id: "3", 
      name: "Expert", 
      description: "A résolu des problèmes critiques", 
      image: "/lovable-uploads/be4748c1-9a46-4e46-8375-eadde6ef67da.png", 
      level: 1, 
      maxLevel: 5,
      progress: 20,
      isUnlocked: false,
      category: "expertise"
    },
    { 
      id: "4", 
      name: "Collaborateur", 
      description: "A aidé 5 collègues sur leurs tâches", 
      image: "/lovable-uploads/f8c95170-c1a8-4b8b-8fe7-0296afb53761.png", 
      level: 1, 
      maxLevel: 3,
      progress: 0,
      isUnlocked: false,
      category: "collaboration"
    },
    { 
      id: "5", 
      name: "Ponctuel", 
      description: "A terminé 10 tâches avant la date limite", 
      image: "/lovable-uploads/caebebe7-bf7b-4c65-87b5-35ce5afd41e9.png", 
      level: 1, 
      maxLevel: 3,
      progress: 80,
      isUnlocked: true,
      category: "performance"
    },
    { 
      id: "6", 
      name: "Innovation", 
      description: "A proposé 3 nouvelles idées adoptées", 
      image: "/lovable-uploads/c275d237-065d-4151-991f-58bc484d509b.png", 
      level: 1, 
      maxLevel: 4,
      progress: 0,
      isUnlocked: false,
      category: "expertise"
    }
  ];

  // Filtrer les badges en fonction de la recherche et de l'onglet actif
  const filteredBadges = allBadges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          badge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'unlocked') {
      return matchesSearch && badge.isUnlocked;
    } else if (activeTab === 'locked') {
      return matchesSearch && !badge.isUnlocked;
    } else {
      return matchesSearch && badge.category === activeTab;
    }
  });

  // Obtenir les statistiques des badges
  const badgeStats = {
    total: allBadges.length,
    unlocked: allBadges.filter(b => b.isUnlocked).length,
    progress: Math.round((allBadges.filter(b => b.isUnlocked).length / allBadges.length) * 100)
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Mes Badges</h1>
              <p className="text-gray-500">Suivez votre progression et débloquez de nouveaux badges</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-primary">
                <Award size={14} className="mr-1" />
                {badgeStats.unlocked} badges débloqués
              </Badge>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Progression globale des badges</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={badgeStats.progress} className="h-2 flex-1" />
                    <span className="text-sm text-gray-500 whitespace-nowrap">{badgeStats.progress}%</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {badgeStats.unlocked} sur {badgeStats.total} badges débloqués
                  </p>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">Filtrer</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tous les badges</TabsTrigger>
              <TabsTrigger value="unlocked">Débloqués</TabsTrigger>
              <TabsTrigger value="locked">À débloquer</TabsTrigger>
              <TabsTrigger value="progression">Progression</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBadges.map(badge => (
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
                
                {filteredBadges.length === 0 && (
                  <div className="col-span-full flex justify-center p-8 text-gray-500">
                    <div className="text-center">
                      <Award size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-lg font-medium">Aucun badge trouvé</p>
                      <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Badges;
