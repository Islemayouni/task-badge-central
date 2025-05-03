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
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: 'user123', // Default user ID, adjust as needed
    dueDate: '',
    status: 'À faire',
    priority: 'Moyenne',
    source: 'Interne',
  });

  const API_URL = 'http://localhost:8081/task'; // Adjust if backend uses a prefix

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      console.log('Tasks fetched:', response.data);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(`Erreur: ${err.response?.status} - ${err.message}`);
      console.error('Fetch error:', err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/task`, taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setError(null);
      setIsPopupOpen(false); // Close popup on success
      setNewTask({
        title: '',
        description: '',
        assignedTo: 'user123',
        dueDate: '',
        status: 'À faire',
        priority: 'Moyenne',
        source: 'Interne',
      }); // Reset form
    } catch (err) {
      setError('Erreur lors de la création de la tâche');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    
    return 0;
  });
  const handleAddTaskClick = () => {
    setIsPopupOpen(true); // Open popup
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false); // Close popup
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    createTask(newTask);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <TaskHeader />
          <button
            onClick={handleAddTaskClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            style={{ backgroundColor: 'black', margin: '20px', borderRadius: '11px' }}
          >
            + Nouvelle tâche
          </button>
          <TaskSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          {loading && <p>Chargement des tâches...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && <TaskGrid tasks={sortedTasks} />}
          <div className="mt-8">
            <TaskStats />
          </div>
         

          {/* Popup/Modal for Adding a Task */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Nouvelle Tâche</h2>
                <form onSubmit={handleSubmitTask}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Titre</label>
                    <input
                      type="text"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Date d'échéance</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Statut</label>
                    <select
                      name="status"
                      value={newTask.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="À faire">À faire</option>
                      <option value="En cours">En cours</option>
                      <option value="Terminée">Terminée</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Priorité</label>
                    <select
                      name="priority"
                      value={newTask.priority}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Haute">Haute</option>
                      <option value="Moyenne">Moyenne</option>
                      <option value="Basse">Basse</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Source</label>
                    <select
                      name="source"
                      value={newTask.source}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Interne">Interne</option>
                      <option value="JIRA">JIRA</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handlePopupClose}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Créer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Tasks;


