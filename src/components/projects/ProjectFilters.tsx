
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface ProjectFiltersProps {
  onSearch: (value: string) => void;
}

export const ProjectFilters = ({ onSearch }: ProjectFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Rechercher un projet..." 
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} />
          Filtres
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          Nouveau projet
        </Button>
      </div>
    </div>
  );
};
