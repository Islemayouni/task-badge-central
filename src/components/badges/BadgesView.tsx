
import React, { useState } from 'react';
import { Badge as BadgeComponent } from '@/types/badge';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Award } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Données de badges statiques pour démonstration
const badgesSample: BadgeComponent[] = [
  {
    id: "badge1",
    name: "Expert en résolution",
    description: "A résolu plus de 20 tâches complexes",
    image: "/lovable-uploads/488db44b-e3e9-4505-afec-611b9123f2ba.png",
    level: 2,
    maxLevel: 3,
    progress: 75,
    isUnlocked: true,
  },
  {
    id: "badge2",
    name: "Champion de vitesse",
    description: "A complété 10 tâches avant les délais",
    image: "/lovable-uploads/930b5cde-c295-4f49-872b-0efc0d540584.png",
    level: 1,
    maxLevel: 3,
    progress: 40,
    isUnlocked: true,
  },
  {
    id: "badge3",
    name: "Collaborateur d'élite",
    description: "A participé à plus de 5 projets d'équipe",
    image: "/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png",
    level: 3,
    maxLevel: 3,
    progress: 100,
    isUnlocked: true,
  },
  {
    id: "badge4",
    name: "Maître de la documentation",
    description: "A créé une documentation complète pour 3 projets",
    image: "/lovable-uploads/be4748c1-9a46-4e46-8375-eadde6ef67da.png",
    level: 1,
    maxLevel: 2,
    progress: 50,
    isUnlocked: true,
  },
  {
    id: "badge5",
    name: "Innovateur",
    description: "A proposé 5 idées innovantes adoptées par l'équipe",
    image: "/lovable-uploads/488db44b-e3e9-4505-afec-611b9123f2ba.png",
    level: 1,
    maxLevel: 3,
    progress: 35,
    isUnlocked: true,
  },
  {
    id: "badge6",
    name: "Perfectionniste",
    description: "A maintenu un taux d'erreur inférieur à 1% sur 30 tâches",
    image: "/lovable-uploads/930b5cde-c295-4f49-872b-0efc0d540584.png",
    level: 2,
    maxLevel: 3,
    progress: 65,
    isUnlocked: true,
  },
  {
    id: "badge7",
    name: "Ultra Performance",
    description: "Badge verrouillé",
    image: "/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png",
    level: 0,
    maxLevel: 3,
    progress: 0,
    isUnlocked: false,
  },
  {
    id: "badge8",
    name: "Mentor",
    description: "Badge verrouillé",
    image: "/lovable-uploads/be4748c1-9a46-4e46-8375-eadde6ef67da.png",
    level: 0,
    maxLevel: 2,
    progress: 0,
    isUnlocked: false,
  },
];

const BadgesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Filtrer les badges selon la recherche et le filtre
  const filteredBadges = badgesSample.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') {
      return matchesSearch;
    } else if (filter === 'unlocked') {
      return matchesSearch && badge.isUnlocked;
    } else if (filter === 'locked') {
      return matchesSearch && !badge.isUnlocked;
    }
    
    return matchesSearch;
  });

  // Statistiques des badges
  const totalBadges = badgesSample.length;
  const unlockedBadges = badgesSample.filter(badge => badge.isUnlocked).length;
  const progressPercentage = Math.round((unlockedBadges / totalBadges) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mes Badges</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary flex items-center gap-1">
          <Award className="h-4 w-4" />
          {unlockedBadges} sur {totalBadges} débloqués
        </Badge>
      </div>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 w-full">
              <h3 className="text-sm font-medium mb-2">Progression générale</h3>
              <div className="flex items-center gap-2">
                <Progress value={progressPercentage} className="h-2 flex-1" />
                <span className="text-sm text-gray-500">{progressPercentage}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher un badge..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-3 py-2 border rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tous</option>
                <option value="unlocked">Débloqués</option>
                <option value="locked">Verrouillés</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBadges.map(badge => (
          <div 
            key={badge.id} 
            className={`bg-white border rounded-md p-4 flex flex-col items-center ${!badge.isUnlocked ? 'opacity-60' : ''}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${badge.isUnlocked ? 'bg-primary/10' : 'bg-gray-200'}`}>
              {badge.isUnlocked ? (
                <img src={badge.image} alt={badge.name} className="w-10 h-10" />
              ) : (
                <span className="text-3xl text-gray-400">?</span>
              )}
            </div>
            
            <h3 className="font-medium text-center mb-1">{badge.name}</h3>
            
            <div className="text-xs text-gray-500 mb-2">
              {badge.isUnlocked ? `Niveau ${badge.level}/${badge.maxLevel}` : 'Non débloqué'}
            </div>
            
            <p className="text-sm text-center text-gray-600 mb-3">
              {badge.isUnlocked ? badge.description : 'Badge verrouillé'}
            </p>
            
            <div className="w-full mt-2">
              <Progress value={badge.progress} className="h-1.5" />
              <div className="text-xs text-gray-500 mt-1 text-center">
                {badge.isUnlocked ? `${badge.progress}% vers le niveau suivant` : 'Complétez des tâches pour débloquer'}
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default BadgesView;
