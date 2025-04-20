
import { useState } from "react";
import { Project, ProjectFilters } from "@/types/project";

export const useProjects = (initialProjects: Project[]) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filters, setFilters] = useState<ProjectFilters>({
    status: [],
    category: [],
    projectLead: []
  });

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filters.status.length === 0 || filters.status.includes(project.etat);
    const matchesCategory = filters.category.length === 0 || filters.category.includes(project.categorie);
    const matchesLead = filters.projectLead.length === 0 || 
      filters.projectLead.includes(`${project.chefDeProjet.prenom} ${project.chefDeProjet.nom}`);

    return matchesStatus && matchesCategory && matchesLead;
  });

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const addProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  return {
    projects: filteredProjects,
    filters,
    setFilters,
    updateProject,
    deleteProject,
    addProject
  };
};
