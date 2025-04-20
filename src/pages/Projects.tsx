
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { Project } from '@/types/project';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Exemple de données de projet
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
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.cleProjet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Projets</h1>
              <p className="text-muted-foreground">
                Gérez et suivez tous vos projets au même endroit
              </p>
            </div>
            
            <ProjectFilters onSearch={setSearchQuery} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
