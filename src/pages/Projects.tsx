import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters, FilterOptions } from '@/components/projects/ProjectFilters';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/types/user';
import { CreateProjectForm } from '@/components/projects/CreateProjectForm';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    statuses: [],
    chefDeProjet: []
  });
  const [projects, setProjects] = useState<Project[]>([
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
      tasks: []
    },
    {
      id: "P002",
      nom: "Plateforme RH",
      cleProjet: "RH-456",
      description: "Nouvelle plateforme de gestion des ressources humaines",
      categorie: "Ressources Humaines",
      typeProjet: "Web",
      iconeUrl: "/lovable-uploads/316bfdd4-fad4-43eb-9161-d9d5b1d5430c.png",
      etat: "en_pause",
      chefDeProjet: {
        id: "U002",
        nom: "Martin",
        prenom: "Sophie",
        email: "sophie.martin@entreprise.com",
        role: "Chef de projet"
      },
      personneAssigneeParDefaut: null,
      roles: [],
      utilisateursAssocies: [
        {
          id: "U002",
          nom: "Martin",
          prenom: "Sophie",
          email: "sophie.martin@entreprise.com",
          role: "Chef de projet"
        }
      ],
      dateCreation: "2023-11-15",
      dateDerniereModif: "2024-03-28",
      versionLogiciel: "0.8.0",
      tags: ["RH", "React", "Node.js"],
      configWorkflow: {
        etapes: [],
        transitions: []
      },
      droitAcces: [],
      archive: false,
      urlProjet: "/projects/P002"
    },
    {
      id: "P003",
      nom: "Système de Facturation",
      cleProjet: "FIN-789",
      description: "Refonte du système de facturation entreprise",
      categorie: "Finance",
      typeProjet: "Backend",
      iconeUrl: "/lovable-uploads/8046b1cd-63bb-4c70-a8ef-409a7b78b467.png",
      etat: "terminé",
      chefDeProjet: {
        id: "U003",
        nom: "Petit",
        prenom: "Jean",
        email: "jean.petit@entreprise.com",
        role: "Chef de projet"
      },
      personneAssigneeParDefaut: null,
      roles: [],
      utilisateursAssocies: [
        {
          id: "U003",
          nom: "Petit",
          prenom: "Jean",
          email: "jean.petit@entreprise.com",
          role: "Chef de projet"
        }
      ],
      dateCreation: "2023-08-10",
      dateDerniereModif: "2024-01-15",
      versionLogiciel: "2.0.0",
      tags: ["Finance", "Java", "Spring"],
      configWorkflow: {
        etapes: [],
        transitions: []
      },
      droitAcces: [],
      archive: false,
      urlProjet: "/projects/P003"
    }
  ]);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const { user } = useAuth();
  const userIsManager = user ? isManager(user.role) : false;

  const filteredProjectsByUser = userIsManager
    ? projects
    : projects.filter(project => 
        user && project.utilisateursAssocies.some(u => u.id === user.id)
      );

  const filteredProjects = filteredProjectsByUser.filter(project => {
    const matchesSearch = 
      project.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.cleProjet.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      filters.categories.length === 0 || 
      filters.categories.includes(project.categorie);
    
    const matchesStatus = 
      filters.statuses.length === 0 || 
      filters.statuses.includes(project.etat);
    
    const chefNomComplet = `${project.chefDeProjet.prenom} ${project.chefDeProjet.nom}`;
    const matchesChef = 
      filters.chefDeProjet.length === 0 || 
      filters.chefDeProjet.includes(chefNomComplet);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesChef;
  });

  const handleProjectCreated = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <div className="flex h-screen bg-[#1A1F2C]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-white">Projets</h1>
                <p className="text-gray-400">
                  {userIsManager 
                    ? "Gérez et suivez tous les projets au même endroit" 
                    : "Consultez les projets auxquels vous êtes associé"}
                </p>
              </div>
              
              {userIsManager && (
                <Button 
                  className="sopra-purple-gradient text-white"
                  onClick={() => setIsCreateProjectOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Nouveau projet
                </Button>
              )}
            </div>
            
            <ProjectFilters 
              onSearch={setSearchQuery} 
              onFilter={setFilters}
              projects={projects}
            />
            
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    isManager={userIsManager}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#1A1F2C]/60 rounded-lg border border-gray-800">
                <div className="mx-auto w-16 h-16 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">Aucun projet trouvé</h3>
                <p className="text-gray-400">
                  {userIsManager 
                    ? "Aucun projet ne correspond à vos critères de recherche." 
                    : "Vous n'êtes associé à aucun projet correspondant à ces critères."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <CreateProjectForm 
        open={isCreateProjectOpen}
        onOpenChange={setIsCreateProjectOpen}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Projects;
