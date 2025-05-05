
import React from 'react';
import { Progress } from '@/components/ui/progress';

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
          <img src={image} alt={name} className="w-10 h-10" />
        ) : (
          <span className="text-3xl text-gray-400">?</span>
        )}
      </div>
      
      <h3 className="font-medium text-center mb-1">{name}</h3>
      
      <div className="text-xs text-gray-500 mb-2">
        {isUnlocked ? `Niveau ${level}/${maxLevel}` : 'Non débloqué'}
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
