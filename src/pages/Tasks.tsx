<<<<<<< HEAD

import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskHeader from '@/components/tasks/TaskHeader';
import TaskStats from '@/components/tasks/TaskStats';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const Tasks = () => {
<<<<<<< HEAD
  const { toast } = useToast();
  const [showJiraTasks, setShowJiraTasks] = useState(true);

  const handleDelete = (id: string) => {
    toast({
      title: "Tâche supprimée",
      description: `La tâche ${id} a été supprimée avec succès.`
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Modification de tâche",
      description: `Édition de la tâche ${id}.`
    });
  };

  const handleAddTask = () => {
    toast({
      title: "Nouvelle tâche",
      description: "Formulaire de création de tâche ouvert."
    });
=======
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Ajout d'un état pour gérer l'ouverture de la popup de modification
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: 'user123',
    dueDate: '',
    status: 'À faire',
    priority: 'Moyenne',
    source: 'Interne',
  });
  // Ajout d'un état pour stocker la tâche en cours de modification
  const [editTask, setEditTask] = useState(null);
  // Ajout d'un état pour stocker la tâche sélectionnée (pour détails ou actions spécifiques)
  const [selectedTask, setSelectedTask] = useState(null);

  const API_URL = 'http://localhost:8081/task';

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      const tasksWithDocIds = response.data.map(task => ({
        ...task,
        docId: task._id || task.id,
      }));
      setTasks(tasksWithDocIds);
      setError(null);
    } catch (err) {
      setError(`Erreur: ${err.response?.status} - ${err.message}`);
      console.error('Fetch error:', err.response || err);
    } finally {
      setLoading(false);
    }
  };
  // Ajout de la fonction pour obtenir une tâche spécifique par ID
  const fetchTaskById = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks/${taskId}`);
      setSelectedTask(response.data);
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
      setIsPopupOpen(false);
      setNewTask({
        title: '',
        description: '',
        assignedTo: 'user123',
        dueDate: '',
        status: 'À faire',
        priority: 'Moyenne',
        source: 'Interne',
      });
    } catch (err) {
      setError('Erreur lors de la création de la tâche');
      console.error(err);
    }
  };

  // Ajout de la fonction pour mettre à jour une tâche via l'API
  const updateTask = async (taskData) => {
    try {
      await axios.put(`${API_URL}/tasks/${taskData.docId}`, taskData);
      fetchTasks();
      setIsEditPopupOpen(false);
      setEditTask(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour de la tâche');
      console.error('Erreur de mise à jour:', err.response ? err.response.data : err.message);
    }
  };

  const deleteTask = async (docId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      console.log('Tentative de suppression avec docId:', docId);
      try {
        await axios.delete(`${API_URL}/tasks/${docId}`);
        fetchTasks();
      } catch (err) {
        setError('Erreur lors de la suppression de la tâche');
        console.error('Erreur de suppression:', err.response ? err.response.data : err.message);
      }
    }
  };
  // Ajout de la fonction pour marquer une tâche comme terminée
  const markAsCompleted = async (taskId) => {
    try {
      await axios.patch(`${API_URL}/tasks/${taskId}/complete`);
      fetchTasks();
    } catch (err) {
      setError('Erreur lors du marquage comme terminé');
      console.error('Erreur:', err.response ? err.response.data : err.message);
    }
  };
  // Ajout de la fonction pour changer le statut d'une tâche
  const changeTaskStatus = async (taskId, status) => {
    try {
      await axios.patch(`${API_URL}/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch (err) {
      setError('Erreur lors du changement de statut');
      console.error('Erreur:', err.response ? err.response.data : err.message);
    }
  };

  // Ajout de la fonction pour affecter une tâche à un utilisateur
  const assignTaskToUser = async (taskId, userId) => {
    try {
      await axios.post(`${API_URL}/tasks/assign`, { taskId, userId });
      fetchTasks();
    } catch (err) {
      setError('Erreur lors de l\'assignation de la tâche');
      console.error('Erreur:', err.response ? err.response.data : err.message);
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
    console.log('Tri en cours avec sortBy:', sortBy);
    switch (sortBy) {
      case 'deadline':
        return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
      case 'priority':
        const priorityOrder = { 'Haute': 0, 'Moyenne': 1, 'Basse': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'status':
        const statusOrder = { 'À faire': 0, 'En cours': 1, 'Terminée': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });

  const handleAddTaskClick = () => {
    setIsPopupOpen(true);
  };

  // Ajout de la fonction pour ouvrir la popup de modification et pré-remplir avec les données de la tâche
  const handleEditTaskClick = (task) => {
    setEditTask(task);
    setIsEditPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    // Ajout de la fermeture de la popup de modification
    setIsEditPopupOpen(false);
    setEditTask(null);
    setSelectedTask(null); // Réinitialisation de la tâche sélectionnée
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Ajout de la fonction pour gérer les changements dans les champs de la popup de modification
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    createTask(newTask);
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
  };

  // Ajout de la fonction pour soumettre les modifications de la tâche
  const handleSubmitEditTask = (e) => {
    e.preventDefault();
    updateTask(editTask);
  };

  // Ajout de la fonction pour gérer l'affichage des détails ou actions sur une tâche sélectionnée
  const handleTaskAction = (taskId, action) => {
    switch (action) {
      case 'view':
        fetchTaskById(taskId);
        break;
      case 'complete':
        markAsCompleted(taskId);
        break;
      case 'changeStatus':
        const newStatus = prompt('Nouveau statut (À faire, En cours, Terminée) :');
        if (newStatus && ['À faire', 'En cours', 'Terminée'].includes(newStatus)) {
          changeTaskStatus(taskId, newStatus);
        }
        break;
      case 'assign':
        const userId = prompt('ID de l\'utilisateur à assigner :');
        if (userId) {
          assignTaskToUser(taskId, userId);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
<<<<<<< HEAD
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <TaskHeader />
              <Button className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2" onClick={handleAddTask}>
                <Plus size={18} /> Nouvelle tâche
              </Button>
            </div>

            <TaskStats 
              deadlineSoon={3}
              highPriority={4}
              completedThisWeek={5}
            />
            
            <TaskGrid onDelete={handleDelete} onEdit={handleEdit} />
          </div>
=======
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
          {!loading && !error && (
            <TaskGrid
              tasks={sortedTasks}
              onDelete={deleteTask}
              onAddTask={handleAddTaskClick}
              // Ajout de la prop onEdit passée à TaskGrid
              onEdit={handleEditTaskClick}
              // Ajout de la prop pour gérer les actions sur une tâche
              onAction={handleTaskAction}
            />
          )}
          <div className="mt-8">
            <TaskStats />
          </div>

          {/* Popup pour ajouter une tâche */}
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

          {/* Ajout de la popup pour modifier une tâche */}
          {isEditPopupOpen && editTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Modifier Tâche</h2>
                <form onSubmit={handleSubmitEditTask}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Titre</label>
                    <input
                      type="text"
                      name="title"
                      value={editTask.title}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      value={editTask.description || ''}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Date d'échéance</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={editTask.dueDate ? new Date(editTask.dueDate).toISOString().split('T')[0] : ''}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Statut</label>
                    <select
                      name="status"
                      value={editTask.status}
                      onChange={handleEditInputChange}
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
                      value={editTask.priority}
                      onChange={handleEditInputChange}
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
                      value={editTask.source}
                      onChange={handleEditInputChange}
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
                      Mettre à jour
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Ajout d'une popup pour afficher les détails ou gérer les actions sur une tâche sélectionnée */}
          {selectedTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Détails de la Tâche</h2>
                <p><strong>Titre :</strong> {selectedTask.title}</p>
                <p><strong>Description :</strong> {selectedTask.description || 'Aucune'}</p>
                <p><strong>Statut :</strong> {selectedTask.status}</p>
                <p><strong>Priorité :</strong> {selectedTask.priority}</p>
                <p><strong>Date limite :</strong> {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : 'Aucune'}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleTaskAction(selectedTask.docId, 'complete')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                  >
                    Marquer comme terminée
                  </button>
                  <button
                    onClick={() => handleTaskAction(selectedTask.docId, 'changeStatus')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Changer statut
                  </button>
                  <button
                    onClick={() => handleTaskAction(selectedTask.docId, 'assign')}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Affecter à un utilisateur
                  </button>
                  <button
                    onClick={handlePopupClose}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mt-2"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
        </main>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Tasks;
=======
export default Tasks;
>>>>>>> f5572f5 (Mise à jour des composants + suppression badgeApi)
