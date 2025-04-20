
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {project.iconeUrl && (
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                <img src={project.iconeUrl} alt={project.nom} className="w-6 h-6" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{project.nom}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.cleProjet}</p>
            </div>
          </div>
          <Badge className={
            project.etat === 'actif' ? 'bg-green-100 text-green-800' :
            project.etat === 'en_pause' ? 'bg-yellow-100 text-yellow-800' :
            project.etat === 'terminé' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }>
            {project.etat}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
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
              <span>Chef de projet</span>
              <span className="font-medium">{project.chefDeProjet.prenom} {project.chefDeProjet.nom}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex justify-between items-center text-sm">
          <span>Version {project.versionLogiciel}</span>
          <span className="text-primary hover:underline cursor-pointer">
            Voir les détails
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
