import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskHeader from '@/components/tasks/TaskHeader';
import TaskSearch from '@/components/tasks/TaskSearch';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskStats from '@/components/tasks/TaskStats';
import { useToast } from "@/hooks/use-toast";

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: 'user123',
    dueDate: '',
    status: 'À faire',
    priority: 'Moyenne',
    source: 'internal',
  });
  const { toast } = useToast();

  const API_URL = 'http://localhost:8081/task';

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      console.log('Réponse brute de l\'API:', response.data); // Ajoutez ce log
      const tasksWithDocIds = response.data.map(task => ({
        ...task,
        docId: task._id || task.id, // Utilisez l'ID Firebase (ajustez selon la réponse de l'API)
      }));
      console.log('Tâches récupérées avec docIds:', tasksWithDocIds);
      setTasks(tasksWithDocIds);
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
      console.log('Task created:', response.data);
      toast({
        title: "Tâche créée",
        description: "La tâche a été créée avec succès.",
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setError(null);
      setIsPopupOpen(false);
      setNewTask({
        title: '',
        description: '',
        assignedTo: 'user123',
        dueDate: '',
        status: 'À faire',
        priority: 'Moyenne',
        source: 'internal',
      });
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Erreur lors de la création de la tâche');
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la tâche. Veuillez réessayer.",
      });
    }
  };

  const deleteTask = async (taskId) => {
    console.log('Tentative de suppression avec ID Firebase:', taskId);
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError('Erreur lors de la suppression de la tâche');
      console.error('Erreur de suppression:', err.response ? err.response.data : err.message);
    }   
  };

  useEffect(() => {
    fetchTasks();
    
    // Add event listener for opening the add task popup
    const handleOpenAddTaskPopup = () => {
      setIsPopupOpen(true);
    };
    
    window.addEventListener('openAddTaskPopup', handleOpenAddTaskPopup);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('openAddTaskPopup', handleOpenAddTaskPopup);
    };
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
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
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
          <TaskSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          {loading && <p>Chargement des tâches...</p>}
          
          <TaskGrid 
            tasks={sortedTasks}
            onDelete={deleteTask} 
          />
          
          <div className="mt-8">
            <TaskStats />
          </div>

          {/* Popup/Modal for Adding a Task */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
