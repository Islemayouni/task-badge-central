
import { useState } from 'react';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters, FilterOptions } from '@/components/projects/ProjectFilters';
import { Project } from '@/types/project';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    statuses: [],
    chefDeProjet: []
  });

  // Exemple de données de projets
  const projects: Project[] = [
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
      urlProjet: "/projects/P001"
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
  ];

  // Appliquer les filtres
  const filteredProjects = projects.filter(project => {
    // Filtrer par texte de recherche (nom ou clé du projet)
    const matchesSearch = 
      project.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.cleProjet.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrer par catégorie si des filtres sont sélectionnés
    const matchesCategory = 
      filters.categories.length === 0 || 
      filters.categories.includes(project.categorie);
    
    // Filtrer par statut si des filtres sont sélectionnés
    const matchesStatus = 
      filters.statuses.length === 0 || 
      filters.statuses.includes(project.etat);
    
    // Filtrer par chef de projet si des filtres sont sélectionnés
    const chefNomComplet = `${project.chefDeProjet.prenom} ${project.chefDeProjet.nom}`;
    const matchesChef = 
      filters.chefDeProjet.length === 0 || 
      filters.chefDeProjet.includes(chefNomComplet);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesChef;
  });

  return (
    <div className="flex h-screen bg-[#1A1F2C]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2 text-white">Projets</h1>
              <p className="text-gray-400">
                Gérez et suivez tous vos projets au même endroit
              </p>
            </div>
            
            <ProjectFilters 
              onSearch={setSearchQuery} 
              onFilter={setFilters}
              projects={projects}
            />
            
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#1A1F2C]/60 rounded-lg border border-gray-800">
                <div className="mx-auto w-16 h-16 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">Aucun projet trouvé</h3>
                <p className="text-gray-400">
                  Aucun projet ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
