
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, Lock, Award, Star, Trophy, Diamond, Bookmark, Gift, Medal } from 'lucide-react';

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  image: string;
  level: number;
  maxLevel: number;
  progress: number;
  isUnlocked: boolean;
}

// Helper function to get the appropriate icon based on badge ID
const getBadgeIcon = (id: string) => {
  switch (id) {
    case "badge1":
      return <Star className="w-10 h-10 text-yellow-500" />;
    case "badge2":
      return <Trophy className="w-10 h-10 text-blue-500" />;
    case "badge3":
      return <Medal className="w-10 h-10 text-green-500" />;
    case "badge4":
      return <Bookmark className="w-10 h-10 text-purple-500" />;
    case "badge5":
      return <Diamond className="w-10 h-10 text-indigo-500" />;
    case "badge6":
      return <Award className="w-10 h-10 text-amber-500" />;
    case "badge7":
      return <Gift className="w-10 h-10 text-rose-500" />;
    case "badge8":
      return <BadgeCheck className="w-10 h-10 text-cyan-500" />;
    default:
      return <Award className="w-10 h-10 text-primary" />;
  }
};

const BadgeCard: React.FC<BadgeProps> = ({
  id,
  name,
  description,
  image,
  level,
  maxLevel,
  progress,
  isUnlocked
}) => {
  return (
    <div className={`bg-white border rounded-md p-4 flex flex-col items-center ${isUnlocked ? '' : 'opacity-60'}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isUnlocked ? 'bg-primary/10' : 'bg-gray-200'}`}>
        {isUnlocked ? (
          getBadgeIcon(id)
        ) : (
          <Lock className="w-10 h-10 text-gray-400" />
        )}
      </div>
      
      <h3 className="font-medium text-center mb-1">{name}</h3>
      
      <div className="text-xs text-gray-500 mb-2 flex items-center">
        {isUnlocked ? (
          <>
            <BadgeCheck className="w-3 h-3 mr-1 text-primary" /> 
            Niveau {level}/{maxLevel}
          </>
        ) : (
          'Non débloqué'
        )}
      </div>
      
      <p className="text-sm text-center text-gray-600 mb-3">
        {isUnlocked ? description : 'Badge verrouillé'}
      </p>
      
      <div className="w-full mt-2">
        <Progress value={progress} className="h-1.5" />
        <div className="text-xs text-gray-500 mt-1 text-center">
          {isUnlocked ? `${progress}% vers le niveau suivant` : 'Complétez des tâches pour débloquer'}
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
