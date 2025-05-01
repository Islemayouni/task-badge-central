// import React, { useState } from 'react';
// import Header from '@/components/layout/Header';
// import Sidebar from '@/components/layout/Sidebar';
// import TaskHeader from '@/components/tasks/TaskHeader';
// import TaskSearch from '@/components/tasks/TaskSearch';
// import TaskGrid from '@/components/tasks/TaskGrid';
// import TaskStats from '@/components/tasks/TaskStats';

// const Tasks = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('deadline');

//   const tasks = [
//     {
//       id: 'TASK-001',
//       title: 'Implémenter l\'authentification OAuth',
//       description: 'Mettre en place l\'authentification OAuth avec Google et GitHub',
//       status: 'to-do' as const,
//       priority: 'high' as const,
//       assignee: {
//         name: 'Thomas Durand',
//         avatar: 'https://github.com/shadcn.png'
//       },
//       dueDate: '2025-04-20',
//       source: 'internal' as const
//     },
//     {
//       id: 'TASK-002',
//       title: 'Optimiser les performances',
//       description: 'Analyser et améliorer les temps de chargement des pages',
//       status: 'in-progress' as const,
//       priority: 'medium' as const,
//       assignee: {
//         name: 'Marie Laurent'
//       },
//       dueDate: '2025-04-18',
//       source: 'internal' as const
//     },
//     {
//       id: 'TASK-003',
//       title: 'Corriger le bug d\'affichage',
//       status: 'done' as const,
//       priority: 'low' as const,
//       assignee: {
//         name: 'Sophie Martin'
//       },
//       dueDate: '2025-04-15',
//       source: 'internal' as const
//     }
//   ];

//   const filteredTasks = tasks.filter(task =>
//     task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     task.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <Header />
      
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <TaskHeader />
//           <TaskSearch 
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//             sortBy={sortBy}
//             setSortBy={setSortBy}
//           />
//           <TaskGrid tasks={filteredTasks} />
//           <div className="mt-8">
//             <TaskStats />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Tasks;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskHeader from '@/components/tasks/TaskHeader';
import TaskSearch from '@/components/tasks/TaskSearch';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskStats from '@/components/tasks/TaskStats';

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL de base pour l'API 
  const API_URL = 'http://localhost:8081/task';

  // Fonction pour récupérer les tâches via l'API GET
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la récupération des tâches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour créer une nouvelle tâche via l'API POST
  const createTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/task`, taskData);
      // Ajouter la nouvelle tâche à la liste existante
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la création de la tâche');
      console.error(err);
    }
  };

  // Appeler fetchTasks au montage du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filtrer les tâches en fonction de la recherche
  const filteredTasks = tasks.filter(
    (task) =>
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trier les tâches (optionnel, basé sur sortBy)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'deadline') {
      return null;
    }
    // Ajouter d'autres critères de tri si nécessaire
    return 0;
  });

  // Exemple de fonction pour ajouter une tâche (peut être appelée depuis un formulaire)
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: `t${Date.now()}`, // ID temporaire, l'API peut générer un ID
      title: 'Nouvelle tâche',
      description: 'Description de la nouvelle tâche',
      assignedTo: 'user123',
      dueDate: '2025-05-01',
      status: 'À faire',
      priority: 'Moyenne',
      source: 'Interne',
    };
    createTask(newTask);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <TaskHeader />
          <TaskSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Afficher l'état de chargement ou d'erreur */}
          {loading && <p>Chargement des tâches...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Afficher la grille des tâches */}
          {/* {!loading && !error && <TaskGrid tasks={sortedTasks} />} */}

          <div className="mt-8">
            <TaskStats />
          </div>

          {/* Bouton pour tester l'ajout d'une tâche */}
          <button
            onClick={handleAddTask}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ajouter une tâche
          </button>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
