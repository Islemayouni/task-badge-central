
import React from 'react';  
import { Plus } from 'lucide-react';
import TaskCard, { TaskProps } from './TaskCard';

// Static sample tasks data
const sampleTasks: TaskProps[] = [
  {
    id: '1WciQTC2IDk6i1dKr9To',
    docId: '1WciQTC2IDk6i1dKr9To',
    title: 'R34GG',
    description: '3434V',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-05-07',
    source: 'internal'
  },
  {
    id: '1t746268193184',
    docId: '1t746268193184',
    title: 'Nouvelle tâche',
    description: 'Description de la nouvelle tâche',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-05-01',
    source: 'internal'
  },
  {
    id: '1t745856158022',
    docId: '1t745856158022',
    title: 'Nouvelle tâche',
    description: 'Description de la nouvelle tâche',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-05-01',
    source: 'internal'
  },
  {
    id: 'KecZWiBOnCSI0ZNb7H1z',
    docId: 'KecZWiBOnCSI0ZNb7H1z',
    title: 'vqfb',
    description: 'fbEFB',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-04-30',
    source: 'internal'
  },
  {
    id: 'O5eEy6W69WpMQGCU1Cv',
    docId: 'O5eEy6W69WpMQGCU1Cv',
    title: 'vqfb',
    description: 'fbEFB',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-04-30',
    source: 'internal'
  },
  {
    id: 'Zw6nMu4p0omtStJKC4zPK',
    docId: 'Zw6nMu4p0omtStJKC4zPK',
    title: 'ayouni',
    description: 'ecevczev',
    status: 'À faire',
    priority: 'Haute',
    dueDate: '2025-05-01',
    source: 'internal'
  },
  {
    id: 't1',
    docId: 't1',
    title: 'Créer une interface',
    description: 'Développer l\'interface utilisateur',
    status: 'À faire',
    priority: 'Haute',
    dueDate: '2025-05-01',
    source: 'internal'
  },
  {
    id: 'custom',
    docId: 'custom',
    title: 'Créer une interfaceeee',
    description: 'Développer l\'interface utilisateur',
    status: 'À faire',
    priority: 'Moyenne',
    dueDate: '2025-05-01',
    source: 'internal'
  }
];

interface TaskGridProps {
  tasks?: TaskProps[];
  onDelete?: (id: string) => void;
}

const TaskGrid = ({ tasks = sampleTasks, onDelete }: TaskGridProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes tâches</h1>
        <button className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2">
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
        {tasks.map(task => (
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
            onDelete={() => onDelete && onDelete(task.docId || '')}
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
