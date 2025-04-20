
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronDown } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Project } from "@/types/project";

interface ProjectFiltersProps {
  onSearch: (value: string) => void;
  onFilter: (filters: FilterOptions) => void;
  projects: Project[];
}

export interface FilterOptions {
  categories: string[];
  statuses: string[];
  chefDeProjet: string[];
}

export const ProjectFilters = ({ onSearch, onFilter, projects }: ProjectFiltersProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedChefs, setSelectedChefs] = useState<string[]>([]);

  // Extraire les valeurs uniques des projets
  const uniqueCategories = [...new Set(projects.map(project => project.categorie))];
  const uniqueStatuses = [...new Set(projects.map(project => project.etat))];
  const uniqueChefs = [...new Set(projects.map(project => `${project.chefDeProjet.prenom} ${project.chefDeProjet.nom}`))];

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleFilterChange = () => {
    onFilter({
      categories: selectedCategories,
      statuses: selectedStatuses,
      chefDeProjet: selectedChefs
    });
  };

  // Appliquer les filtres quand ils changent
  useEffect(() => {
    handleFilterChange();
  }, [selectedCategories, selectedStatuses, selectedChefs]);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedChefs([]);
    setIsFilterOpen(false);
  };

  const getActiveFiltersCount = () => {
    return selectedCategories.length + selectedStatuses.length + selectedChefs.length;
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Rechercher un projet..." 
          className="pl-10 bg-[#1A1F2C]/60 border-[#9C27B0]/20 text-white placeholder:text-gray-400"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-[#1A1F2C]/60 border-[#9C27B0]/20 text-white"
            >
              <Filter size={18} />
              Filtres
              {getActiveFiltersCount() > 0 && (
                <span className="ml-1 bg-[#9C27B0] text-white text-xs font-medium py-0.5 px-2 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
              <ChevronDown size={16} className="ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-[#1A1F2C] border-[#9C27B0]/20" align="end">
            <div className="space-y-4">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-2 text-[#9C27B0]">Catégorie</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uniqueCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                        className="border-[#9C27B0]/40 data-[state=checked]:bg-[#9C27B0]"
                      />
                      <Label htmlFor={`category-${category}`} className="cursor-pointer text-white">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-medium mb-2 text-[#9C27B0]">État</h3>
                <div className="space-y-2">
                  {uniqueStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStatuses([...selectedStatuses, status]);
                          } else {
                            setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                          }
                        }}
                        className="border-[#9C27B0]/40 data-[state=checked]:bg-[#9C27B0]"
                      />
                      <Label htmlFor={`status-${status}`} className="cursor-pointer text-white">
                        {status === 'actif' ? 'Actif' : 
                         status === 'en_pause' ? 'En pause' : 
                         status === 'terminé' ? 'Terminé' : 
                         status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Manager */}
              <div>
                <h3 className="font-medium mb-2 text-[#9C27B0]">Chef de projet</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uniqueChefs.map((chef) => (
                    <div key={chef} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`chef-${chef}`}
                        checked={selectedChefs.includes(chef)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedChefs([...selectedChefs, chef]);
                          } else {
                            setSelectedChefs(selectedChefs.filter(c => c !== chef));
                          }
                        }}
                        className="border-[#9C27B0]/40 data-[state=checked]:bg-[#9C27B0]"
                      />
                      <Label htmlFor={`chef-${chef}`} className="cursor-pointer text-white">
                        {chef}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#9C27B0]/20">
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  className="text-gray-300 hover:text-white hover:bg-[#9C27B0]/20"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button className="bg-[#9C27B0] hover:bg-[#6B1B9A] text-white">
          Nouveau projet
        </Button>
      </div>
    </div>
  );
};
