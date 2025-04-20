
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Project, ProjectStats } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award 
} from "lucide-react";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import StatCard from "@/components/dashboard/StatCard";

interface ProjectDetailsProps {
  project: Project;
  stats: ProjectStats;
}

const ProjectDetails = ({ project, stats }: ProjectDetailsProps) => {
  const performanceData = [
    { name: 'Lun', completed: 5, inProgress: 3 },
    { name: 'Mar', completed: 7, inProgress: 4 },
    { name: 'Mer', completed: 3, inProgress: 6 },
    { name: 'Jeu', completed: 8, inProgress: 2 },
    { name: 'Ven', completed: 6, inProgress: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{project.nom}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Clé: {project.cleProjet}</span>
            <span>•</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {project.etat}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(project.dateCreation).toLocaleDateString()}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {project.utilisateursAssocies.length} membres
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Tâches terminées"
          value={stats.completedTasks}
          icon={CheckCircle2}
          trend={{ value: "+12%", positive: true }}
        />
        <StatCard
          title="Tâches en cours"
          value={stats.inProgressTasks}
          icon={Clock}
          variant="highlight"
        />
        <StatCard
          title="Membres actifs"
          value={stats.assignedUsers}
          icon={Users}
        />
        <StatCard
          title="Badges attribués"
          value={stats.badgesAwarded}
          icon={Award}
          trend={{ value: "+3", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart
            data={performanceData}
            title="Performance du projet"
            description="Vue d'ensemble des tâches réalisées"
          />
        </div>
        
        <Card className="hover:border-primary/30 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Équipe du projet
            </CardTitle>
            <CardDescription>
              Membres assignés au projet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.utilisateursAssocies.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {user.prenom[0]}{user.nom[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.prenom} {user.nom}</p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                </div>
                <Badge variant="outline">
                  {user.role === 'manager' ? 'Chef de projet' : 'Membre'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
