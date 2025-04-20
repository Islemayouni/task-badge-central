import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  CheckCircle, 
  Award, 
  BarChart2, 
  Users, 
  Settings, 
  Plus, 
  Clock,
  Star,
  BookOpen,
  Bell,
  Briefcase,
  Layout,
  Search 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="w-64 border-r border-[#9C27B0]/20 bg-[#1A1F2C] h-full">
      <div className="p-4">
        <button className="bg-gradient-to-r from-[#9C27B0] to-[#FF9800] text-white w-full rounded-md py-2 text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90">
          <Plus size={16} />
          <span>Créer une tâche</span>
        </button>
      </div>
      
      <div className="px-4 pt-2 pb-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full px-3 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#9b87f5]/30 pl-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <nav className="px-2 py-2">
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-400 font-medium px-3 mb-2 flex items-center">
            <Briefcase className="h-3 w-3 mr-1.5 text-[#9b87f5]" />
            Général
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" className={`jira-sidebar-item ${isActive('/dashboard') ? 'active' : ''}`}>
                <Home size={18} />
                <span>Tableau de bord</span>
                {isActive('/dashboard') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
              </Link>
            </li>
            <li>
              <Link to="/projects" className={`jira-sidebar-item ${isActive('/projects') ? 'active' : ''}`}>
                <Layout size={18} />
                <span>Projets</span>
                {isActive('/projects') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
                <span className="ml-auto bg-primary/10 text-primary text-xs font-medium py-0.5 px-2 rounded-full">1</span>
              </Link>
            </li>
            <li>
              <Link to="/tasks" className={`jira-sidebar-item ${isActive('/tasks') ? 'active' : ''}`}>
                <CheckCircle size={18} />
                <span>Mes tâches</span>
                {isActive('/tasks') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
                <span className="ml-auto bg-primary/10 text-primary text-xs font-medium py-0.5 px-2 rounded-full">8</span>
              </Link>
            </li>
            <li>
              <Link to="/badges" className={`jira-sidebar-item ${isActive('/badges') ? 'active' : ''}`}>
                <Award size={18} />
                <span>Mes badges</span>
                {isActive('/badges') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-400 font-medium px-3 mb-2 flex items-center">
            <Clock className="h-3 w-3 mr-1.5 text-[#9b87f5]" />
            Planification
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/calendar" className={`jira-sidebar-item ${isActive('/calendar') ? 'active' : ''}`}>
                <Clock size={18} />
                <span>Calendrier</span>
                {isActive('/calendar') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
              </Link>
            </li>
            <li>
              <Link to="/reports" className={`jira-sidebar-item ${isActive('/reports') ? 'active' : ''}`}>
                <BarChart2 size={18} />
                <span>Rapports</span>
                {isActive('/reports') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
              </Link>
            </li>
            <li>
              <Link to="/knowledge" className={`jira-sidebar-item ${isActive('/knowledge') ? 'active' : ''}`}>
                <BookOpen size={18} />
                <span>Base de connaissances</span>
                {isActive('/knowledge') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-400 font-medium px-3 mb-2 flex items-center">
            <Users className="h-3 w-3 mr-1.5 text-[#9b87f5]" />
            Management
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/team" className={`jira-sidebar-item ${isActive('/team') ? 'active' : ''}`}>
                <Users size={18} />
                <span>Équipe</span>
                {isActive('/team') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
              </Link>
            </li>
            <li>
              <Link to="/notifications" className={`jira-sidebar-item ${isActive('/notifications') ? 'active' : ''}`}>
                <Bell size={18} />
                <span>Notifications</span>
                {isActive('/notifications') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
                <span className="ml-auto bg-primary/10 text-primary text-xs font-medium py-0.5 px-2 rounded-full">3</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className={`jira-sidebar-item ${isActive('/settings') ? 'active' : ''}`}>
                <Settings size={18} />
                <span>Paramètres</span>
                {isActive('/settings') && <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-md"></div>}
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mt-8">
          <p className="text-xs uppercase text-gray-400 font-medium px-3 mb-2 flex items-center">
            <Star className="h-3 w-3 mr-1.5 text-[#9b87f5]" />
            Favoris
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/starred" className={`jira-sidebar-item ${isActive('/starred') ? 'active' : ''}`}>
                <Star size={18} className="text-secondary" />
                <span>Tâches importantes</span>
                {isActive('/starred') && <div className="absolute left-0 top-0 w-1 h-full bg-secondary rounded-r-md"></div>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center p-3 bg-black/20 rounded-md border border-[#9C27B0]/20">
          <div className="w-8 h-8 bg-gradient-to-br from-[#9C27B0] to-[#FF9800] rounded-full flex items-center justify-center text-white font-medium text-sm">TD</div>
          <div className="ml-2 truncate">
            <div className="text-sm font-medium text-gray-300">Thomas Durand</div>
            <div className="text-xs text-gray-500">Chef de projet</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
