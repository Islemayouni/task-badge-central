
import React, { useState } from 'react';  
import { Plus } from 'lucide-react';
import TaskCard, { TaskProps } from './TaskCard';

// Static sample tasks data with logical names and descriptions
const sampleTasks: TaskProps[] = [
  {
    id: 'DEV-453',
    docId: '1WciQTC2IDk6i1dKr9To',
    title: 'Implémenter l\'authentification OAuth',
    description: 'Intégrer le système d\'authentification OAuth avec Google et Microsoft',
    status: 'À faire',
    priority: 'Haute',
    dueDate: '2025-05-15',
    source: 'internal',
    assignee: {
      name: 'Marie Dubois'
    }
  },
  {
    id: 'DEV-441',
    docId: '1t746268193184',
    title: 'Corriger bug d\'affichage sur mobile',
    description: 'Le tableau de bord ne s\'affiche pas correctement sur les appareils mobiles',
    status: 'En cours',
    priority: 'Moyenne',
    dueDate: '2025-05-10',
    source: 'internal',
    assignee: {
      name: 'Thomas Martin'
    }
  },
  {
    id: 'DEV-438',
    docId: '1t745856158022',
    title: 'Optimiser les requêtes SQL',
    description: 'Améliorer les performances des requêtes sur la page des rapports',
    status: 'Terminée',
    priority: 'Moyenne',
    dueDate: '2025-05-05',
    source: 'internal',
    assignee: {
      name: 'Sophie Bernard'
    }
  },
  {
    id: 'DESIGN-127',
    docId: 'KecZWiBOnCSI0ZNb7H1z',
    title: 'Créer maquettes pour nouvelle landing page',
    description: 'Concevoir les maquettes Figma pour la refonte de la page d\'accueil',
    status: 'À faire',
    priority: 'Haute',
    dueDate: '2025-05-12',
    source: 'internal',
    assignee: {
      name: 'Julie Moreau'
    }
  },
  {
    id: 'DEV-447',
    docId: 'O5eEy6W69WpMQGCU1Cv',
    title: 'Mettre à jour les dépendances npm',
    description: 'Mettre à jour toutes les bibliothèques vers les dernières versions stables',
    status: 'À faire',
    priority: 'Basse',
    dueDate: '2025-05-20',
    source: 'internal',
    assignee: {
      name: 'Alexandre Petit'
    }
  },
  {
    id: 'DOCS-052',
    docId: 'Zw6nMu4p0omtStJKC4zPK',
    title: 'Rédiger documentation API',
    description: 'Créer une documentation complète pour l\'API REST avec des exemples',
    status: 'En cours',
    priority: 'Moyenne',
    dueDate: '2025-05-14',
    source: 'internal',
    assignee: {
      name: 'Camille Legrand'
    }
  },
  {
    id: 'TEST-118',
    docId: 't1',
    title: 'Écrire tests unitaires pour module paiement',
    description: 'Développer une suite de tests pour le nouveau module de paiement',
    status: 'À faire',
    priority: 'Haute',
    dueDate: '2025-05-08',
    source: 'internal',
    assignee: {
      name: 'Lucas Roux'
    }
  },
  {
    id: 'DEV-450',
    docId: 'custom',
    title: 'Intégrer analytics sur le site web',
    description: 'Ajouter Google Analytics et configurer les événements personnalisés',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-05-18',
    source: 'internal',
    assignee: {
      name: 'Emma Laurent'
    }
  },
  // Ajout de tâches provenant de Jira
  {
    id: 'JIRA-105',
    docId: 'jira-105',
    title: 'Intégration système de paiement Stripe',
    description: 'Implémenter et configurer le système de paiement Stripe pour le site e-commerce',
    status: 'En cours',
    priority: 'Haute',
    dueDate: '2025-05-25',
    source: 'jira',
    assignee: {
      name: 'Nicolas Dupont'
    }
  },
  {
    id: 'JIRA-107',
    docId: 'jira-107',
    title: 'Mise en place CI/CD avec Jenkins',
    description: 'Configurer le pipeline CI/CD pour automatiser le déploiement',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-06-01',
    source: 'jira',
    assignee: {
      name: 'Pierre Lefevre'
    }
  },
  {
    id: 'JIRA-112',
    docId: 'jira-112',
    title: 'Optimisation temps de chargement',
    description: 'Améliorer les performances de l\'application en réduisant le temps de chargement initial',
    status: 'À faire',
    priority: 'Haute',
    dueDate: '2025-05-30',
    source: 'jira',
    assignee: {
      name: 'Jeanne Dubois'
    }
  }
];

interface TaskGridProps {
  tasks?: TaskProps[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const TaskGrid = ({ tasks = sampleTasks, onDelete, onEdit }: TaskGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');

  // Filtrer les tâches en fonction de la recherche
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trier les tâches en fonction du critère choisi
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
      case 'priority':
        const priorityOrder = { 'Haute': 0, 'Moyenne': 1, 'Basse': 2 };
        return priorityOrder[a.priority as 'Haute' | 'Moyenne' | 'Basse'] - priorityOrder[b.priority as 'Haute' | 'Moyenne' | 'Basse'];
      case 'status':
        const statusOrder = { 'À faire': 0, 'En cours': 1, 'Terminée': 2 };
        return statusOrder[a.status as 'À faire' | 'En cours' | 'Terminée'] - statusOrder[b.status as 'À faire' | 'En cours' | 'Terminée'];
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex mb-6">
        <div className="flex-1 relative">
          <input 
            type="text"
            placeholder="Rechercher une tâche..."
            className="w-full py-2 px-4 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ml-2">
          <select 
            className="py-2 px-4 border rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="deadline">Date limite</option>
            <option value="priority">Priorité</option>
            <option value="status">Statut</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTasks.map(task => (
          <TaskCard
            key={task.docId}
            docId={task.docId}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            dueDate={task.dueDate}
            source={task.source}
            assignee={task.assignee}
            onDelete={() => onDelete && onDelete(task.docId || '')}
            onEdit={() => onEdit && onEdit(task.docId || '')}
          />
        ))}
        
        <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors cursor-pointer bg-white">
          <Plus size={24} className="mb-2" />
          <span>Ajouter une nouvelle tâche</span>
        </div>
      </div>
    </div>
  );
};

export default TaskGrid;
