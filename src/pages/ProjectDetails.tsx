
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Project } from '@/types/project';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import KanbanBoard from '@/components/projects/KanbanBoard';
import ProjectDetailsHeader from '@/components/projects/ProjectDetails';
import { useToast } from '@/components/ui/use-toast';
import { isManager } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';

// Exemple de données de tâches pour la démonstration
const mockTasks: Task[] = [
  {
    id: "T001",
    title: "Implémenter l'authentification OAuth",
    description: "Mettre en place l'authentification avec Google et GitHub",
    status: "à faire",
    priority: "high",
    assignee: {
      name: "Thomas Durand",
      id: "U001"
    },
    createdDate: "2024-03-15",
    dueDate: "2024-05-20",
    source: "internal",
    projectId: "P001"
  },
  {
    id: "T002",
    title: "Design de l'interface utilisateur",
    description: "Créer des maquettes pour l'application mobile",
    status: "en cours",
    priority: "medium",
    assignee: {
      name: "Sophie Martin",
      id: "U002"
    },
    createdDate: "2024-04-01",
    dueDate: "2024-05-15",
    source: "internal",
    projectId: "P001"
  },
  {
    id: "T003",
    title: "Test d'intégration Firebase",
    description: "Vérifier la connexion et les opérations CRUD",
    status: "fini",
    priority: "high",
    assignee: {
      name: "Jean Petit",
      id: "U003"
    },
    createdDate: "2024-03-20",
    dueDate: "2024-04-10",
    source: "internal",
    projectId: "P001"
  }
];

// Exemple de données de projets pour la démonstration
const mockProjects: Project[] = [
  {
    id: "P001",
    nom: "Refonte Application Mobile",
    cleProjet: "APP-123",
    description: "Modernisation de l'application mobile pour les clients",
    categorie: "Développement",
    typeProjet: "Application",
    iconeUrl: "/lovable-uploads/20c9b8cf-e6ff-41dc-af0d-d2f48cacd49e.png",
    etat: "actif",
    chefDeProjet: {
      id: "U001",
      nom: "Durand",
      prenom: "Thomas",
      email: "thomas.durand@entreprise.com",
      role: "Chef de projet"
    },
    personneAssigneeParDefaut: null,
    roles: [],
    utilisateursAssocies: [
      {
        id: "U001",
        nom: "Durand",
        prenom: "Thomas",
        email: "thomas.durand@entreprise.com",
        role: "Chef de projet"
      },
      {
        id: "U002",
        nom: "Martin",
        prenom: "Sophie",
        email: "sophie.martin@entreprise.com",
        role: "Développeur"
      },
      {
        id: "U003",
        nom: "Petit",
        prenom: "Jean",
        email: "jean.petit@entreprise.com",
        role: "Testeur"
      }
    ],
    dateCreation: "2024-01-01",
    dateDerniereModif: "2024-04-20",
    versionLogiciel: "1.0.0",
    tags: ["Mobile", "React Native", "API"],
    configWorkflow: {
      etapes: [],
      transitions: []
    },
    droitAcces: [],
    archive: false,
    urlProjet: "/projects/P001",
    tasks: mockTasks
  }
];

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectStats, setProjectStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    assignedUsers: 0,
    badgesAwarded: 2 // Valeur fixe pour la démonstration
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Déterminer si l'utilisateur est un manager
  const userIsManager = user ? isManager(user.role) : false;

  useEffect(() => {
    // Simuler le chargement des données du projet
    const loadProject = async () => {
      try {
        // Dans un cas réel, nous ferions un appel API ici
        const foundProject = mockProjects.find(p => p.id === projectId);
        
        if (foundProject) {
          setProject(foundProject);
          setTasks(foundProject.tasks || []);
          
          // Calculer les statistiques du projet
          const totalTasks = foundProject.tasks?.length || 0;
          const completedTasks = foundProject.tasks?.filter(t => t.status === 'fini').length || 0;
          const inProgressTasks = foundProject.tasks?.filter(t => t.status === 'en cours').length || 0;
          const assignedUsers = new Set(foundProject.tasks?.map(t => t.assignee?.id).filter(Boolean)).size;
          
          setProjectStats({
            totalTasks,
            completedTasks,
            inProgressTasks,
            assignedUsers,
            badgesAwarded: 2 // Valeur fixe pour la démonstration
          });
        } else {
          toast({
            title: "Projet non trouvé",
            description: "Impossible de trouver les détails du projet demandé.",
            variant: "destructive"
          });
          navigate('/projects');
        }
      } catch (error) {
        console.error("Erreur lors du chargement du projet:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement du projet.",
          variant: "destructive"
        });
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId, navigate, toast]);

  const handleAddTask = (columnStatus: string) => {
    toast({
      title: "Nouvelle tâche",
      description: `Ajout d'une nouvelle tâche dans la colonne "${columnStatus}"`,
    });
    // Dans un cas réel, nous ouvririons un formulaire pour créer une tâche
  };

  const handleTaskStatusChange = (taskId: string, newStatus: string) => {
    // Mettre à jour le statut de la tâche localement
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    
    setTasks(updatedTasks);
    toast({
      title: "Statut mis à jour",
      description: `La tâche a été déplacée vers "${newStatus}"`,
    });
  };

  if (!project) {
    return (
      <div className="flex h-screen bg-[#1A1F2C]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <div className="flex justify-center items-center h-full">
              <p>Chargement du projet...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#1A1F2C]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" onClick={() => navigate('/projects')} className="mr-2">
                <ArrowLeft size={16} className="mr-2" />
                Retour aux projets
              </Button>
            </div>

            <ProjectDetailsHeader project={project} stats={projectStats} />

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Tâches du projet</h2>
                {userIsManager && (
                  <Button className="sopra-purple-gradient text-white">
                    <Plus size={16} className="mr-2" />
                    Nouvelle tâche
                  </Button>
                )}
              </div>

              <KanbanBoard 
                tasks={tasks} 
                projectId={project.id} 
                isManager={userIsManager}
                onAddTask={userIsManager ? handleAddTask : undefined}
                onTaskStatusChange={userIsManager ? handleTaskStatusChange : undefined}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
