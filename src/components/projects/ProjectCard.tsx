
import { Project } from "@/types/project";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  isManager?: boolean;
}

export const ProjectCard = ({ project, isManager = false }: ProjectCardProps) => {
  // Calculer les statistiques du projet
  const tasks = project.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'fini').length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className="bg-[#1A1F2C] border-[#9C27B0]/20 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {project.iconeUrl && (
              <div className="w-10 h-10 rounded-md bg-gray-800/50 flex items-center justify-center">
                <img src={project.iconeUrl} alt={project.nom} className="w-6 h-6" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg text-white">{project.nom}</CardTitle>
              <p className="text-sm text-gray-400">{project.cleProjet}</p>
            </div>
          </div>
          <Badge className={
            project.etat === 'actif' ? 'bg-[#9C27B0]/20 text-[#9C27B0]' :
            project.etat === 'en_pause' ? 'bg-[#FF9800]/20 text-[#FF9800]' :
            project.etat === 'terminé' ? 'bg-green-500/20 text-green-500' :
            'bg-gray-500/20 text-gray-500'
          }>
            {project.etat}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-gray-300">
        <p className="text-sm text-gray-400 mb-4">{project.description}</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>{project.utilisateursAssocies.length} membres</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Mis à jour le {new Date(project.dateDerniereModif).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          
          {tasks.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progression</span>
                <span className="font-medium text-white">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{completedTasks} terminées</span>
                <span>{totalTasks} total</span>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Chef de projet</span>
              <span className="font-medium text-white">{project.chefDeProjet.prenom} {project.chefDeProjet.nom}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="sopra-purple-gradient text-white text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4">
        <div className="w-full flex justify-between items-center text-sm">
          <span className="text-gray-400">Version {project.versionLogiciel}</span>
          <Button variant="link" className="text-[#9b87f5] p-0" asChild>
            <Link to={`/projects/${project.id}`} className="flex items-center">
              Voir les détails
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
