
import { Project } from "@/types/project";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="bg-[#1A1F2C] border-gray-800 hover:shadow-lg transition-shadow">
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
            project.etat === 'actif' ? 'bg-[#9b87f5]/20 text-[#9b87f5]' :
            project.etat === 'en_pause' ? 'bg-yellow-500/20 text-yellow-500' :
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
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Chef de projet</span>
              <span className="font-medium text-white">{project.chefDeProjet.prenom} {project.chefDeProjet.nom}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-[#9b87f5]/10 text-[#9b87f5] text-xs">
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
          <span className="text-[#9b87f5] hover:underline cursor-pointer">
            Voir les détails
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
