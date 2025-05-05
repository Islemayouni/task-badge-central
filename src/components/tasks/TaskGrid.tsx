
import React from 'react';  
import { Plus } from 'lucide-react';
import TaskCard, { TaskProps } from './TaskCard';
import { useToast } from '@/components/ui/use-toast';

// Static sample tasks data with logical names, descriptions, and assignees
const sampleTasks: TaskProps[] = [
  {
    id: 'DEV-001',
    docId: 'DEV-001',
    title: 'Implémentation de l\'authentification',
    description: 'Développer et intégrer un système d\'authentification sécurisé avec OAuth et JWT',
    status: 'En cours',
    priority: 'Haute',
    dueDate: '2025-05-15',
    source: 'internal',
    assignee: {
      name: 'Thomas Martin',
      avatar: 'https://i.pravatar.cc/150?u=thomas'
    }
  },
  {
    id: 'DEV-002',
    docId: 'DEV-002',
    title: 'Optimisation des performances',
    description: 'Analyser et améliorer les temps de chargement des pages principales du site',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-05-20',
    source: 'internal',
    assignee: {
      name: 'Sophie Dubois',
      avatar: 'https://i.pravatar.cc/150?u=sophie'
    }
  },
  {
    id: 'DEV-003',
    docId: 'DEV-003',
    title: 'Correction des bugs UI',
    description: 'Résoudre les problèmes d\'affichage sur les appareils mobiles',
    status: 'Terminée',
    priority: 'Basse',
    dueDate: '2025-05-01',
    source: 'internal',
    assignee: {
      name: 'Pierre Durand',
      avatar: 'https://i.pravatar.cc/150?u=pierre'
    }
  },
  {
    id: 'DEV-004',
    docId: 'DEV-004',
    title: 'Mise à jour des dépendances',
    description: 'Mettre à jour toutes les bibliothèques à leurs dernières versions stables',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-05-25',
    source: 'internal',
    assignee: {
      name: 'Marie Lambert',
      avatar: 'https://i.pravatar.cc/150?u=marie'
    }
  },
  {
    id: 'DEV-005',
    docId: 'DEV-005',
    title: 'Création de nouvelles pages',
    description: 'Développer les pages "À propos" et "Contact" selon les maquettes',
    status: 'En cours',
    priority: 'Haute',
    dueDate: '2025-05-18',
    source: 'internal',
    assignee: {
      name: 'Jean Dupont',
      avatar: 'https://i.pravatar.cc/150?u=jean'
    }
  },
  {
    id: 'DEV-006',
    docId: 'DEV-006',
    title: 'Tests unitaires',
    description: 'Augmenter la couverture des tests unitaires à 80% minimum',
    status: 'À faire',
    priority: 'Haute',
    dueDate: '2025-05-30',
    source: 'internal',
    assignee: {
      name: 'Lucie Moreau',
      avatar: 'https://i.pravatar.cc/150?u=lucie'
    }
  },
  {
    id: 'DEV-007',
    docId: 'DEV-007',
    title: 'Documentation API',
    description: 'Rédiger la documentation complète des API avec Swagger',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-06-05',
    source: 'internal',
    assignee: {
      name: 'Marc Bernard',
      avatar: 'https://i.pravatar.cc/150?u=marc'
    }
  },
  {
    id: 'DEV-008',
    docId: 'DEV-008',
    title: 'Intégration paiement Stripe',
    description: 'Intégrer la passerelle de paiement Stripe pour les transactions',
    status: 'En cours',
    priority: 'Haute',
    dueDate: '2025-05-22',
    source: 'internal',
    assignee: {
      name: 'Julie Bernard',
      avatar: 'https://i.pravatar.cc/150?u=catherine'
    }
  }
];

interface TaskGridProps {
  tasks?: TaskProps[];
  onDelete?: (id: string) => void;
  currentUser?: string; // Nouvel attribut pour filtrer par utilisateur connecté
}

const TaskGrid = ({ tasks = sampleTasks, onDelete, currentUser }: TaskGridProps) => {
  const { toast } = useToast();

  // Filtrer les tâches en fonction de l'utilisateur connecté
  const filteredTasks = currentUser 
    ? tasks.filter(task => task.assignee && task.assignee.name === currentUser)
    : tasks;

  const handleEditTask = (id: string) => {
    toast({
      title: "Modification de tâche",
      description: `Édition de la tâche ${id}`,
    });
  };
  
  const handleDeleteTask = (id: string) => {
    // If onDelete prop is provided, use it, otherwise just show a toast
    if (onDelete) {
      onDelete(id);
    } else {
      toast({
        title: "Suppression de tâche",
        description: `La tâche ${id} a été supprimée`,
      });
    }
  };

  const handleAddTask = () => {
    toast({
      title: "Nouvelle tâche",
      description: "Ajout d'une nouvelle tâche",
    });
  };

  // Modifier le titre en fonction de si on filtre ou non
  const pageTitle = currentUser ? "Mes tâches assignées" : "Toutes les tâches";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <button 
          className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2"
          onClick={handleAddTask}
        >
          <Plus size={18} /> Nouvelle tâche
        </button>
      </div>
      
      <div className="flex mb-6">
        <div className="flex-1 relative">
          <input 
            type="text"
            placeholder="Rechercher une tâche..."
            className="w-full py-2 px-4 border rounded-lg"
          />
        </div>
        <div className="ml-2">
          <select className="py-2 px-4 border rounded-lg">
            <option>Date limite</option>
            <option>Priorité</option>
            <option>Statut</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          <>
            {filteredTasks.map(task => (
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
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
            
            <div 
              className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors cursor-pointer bg-white"
              onClick={handleAddTask}
            >
              <Plus size={24} className="mb-2" />
              <span>Ajouter une nouvelle tâche</span>
            </div>
          </>
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 mb-4">Vous n'avez aucune tâche assignée.</p>
            <button 
              className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2 mx-auto"
              onClick={handleAddTask}
            >
              <Plus size={18} /> Créer une tâche
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskGrid;
