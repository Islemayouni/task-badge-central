import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters, FilterOptions } from '@/components/projects/ProjectFilters';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/types/user';
import { CreateProjectForm } from '@/components/projects/CreateProjectForm';
import { Badge } from "@/components/ui/badge";

const mockUserBadges = [
  {
    id: "b1",
    name: "Starter",
    description: "Premier projet créé",
    image: "/lovable-uploads/316bfdd4-fad4-43eb-9161-d9d5b1d5430c.png",
    level: 1,
    maxLevel: 5,
    progress: 100,
    isUnlocked: true,
  },
  {
    id: "b2",
    name: "Collaborateur",
    description: "10 tâches terminées",
    image: "/lovable-uploads/20c9b8cf-e6ff-41dc-af0d-d2f48cacd49e.png",
    level: 2,
    maxLevel: 5,
    progress: 60,
    isUnlocked: true,
  }
];

const mockTeamBadges = [
  {
    user: "Marie Laurent",
    badges: [
      {
        id: "b3",
        name: "Expert",
        description: "20 tâches terminées",
        image: "/lovable-uploads/8046b1cd-63bb-4c70-a8ef-409a7b78b467.png",
        level: 3,
        maxLevel: 5,
        progress: 45,
        isUnlocked: true,
      }
    ]
  },
  {
    user: "Jean Petit",
    badges: [
      {
        id: "b4",
        name: "Team Player",
        description: "Travail d'équipe remarquable",
        image: "/lovable-uploads/20c9b8cf-e6ff-41dc-af0d-d2f48cacd49e.png",
        level: 2,
        maxLevel: 5,
        progress: 85,
        isUnlocked: true,
      }
    ]
  }
];

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

  const handleOpenCreateProject = () => {
    setIsCreateProjectOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-0 md:p-6">
          <div className="max-w-7xl mx-auto pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Mes badges</h2>
                <div className="flex flex-wrap gap-4">
                  {mockUserBadges.map(badge => (
                    <div key={badge.id} className="flex flex-col items-center">
                      <img src={badge.image} alt={badge.name} className="w-12 h-12 rounded-full mb-1 border" />
                      <span className="font-medium text-sm">{badge.name}</span>
                    </div>
                  ))}
                  {mockUserBadges.length === 0 && (
                    <span className="text-gray-400">Aucun badge débloqué pour l’instant.</span>
                  )}
                </div>
              </section>
              {userIsManager && (
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Badges de l’équipe</h2>
                  <div className="space-y-3">
                    {mockTeamBadges.map(member => (
                      <div key={member.user} className="flex items-center gap-4">
                        <span className="font-semibold text-sm w-32 truncate">{member.user}</span>
                        <div className="flex flex-wrap gap-2">
                          {member.badges.map(badge => (
                            <div key={badge.id} className="flex flex-col items-center">
                              <img src={badge.image} alt={badge.name} className="w-8 h-8 rounded-full mb-1 border" />
                              <span className="text-xs">{badge.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-gray-900">Projets</h1>
                <p className="text-gray-500">
                  {userIsManager 
                    ? "Gérez et suivez tous les projets au même endroit" 
                    : "Consultez les projets auxquels vous êtes associé"}
                </p>
              </div>
              
              {userIsManager && (
                <Button 
                  className="sopra-purple-gradient text-white"
                  onClick={handleOpenCreateProject}
                >
                  <Plus size={16} className="mr-2" />
                  Nouveau projet
                </Button>
              )}
            </div>

            <div className="mb-6">
              <ProjectFilters 
                onSearch={setSearchQuery} 
                onFilter={setFilters}
                projects={projects}
              />
            </div>

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
              <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                <div className="mx-auto w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Aucun projet trouvé</h3>
                <p className="text-gray-500">
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
