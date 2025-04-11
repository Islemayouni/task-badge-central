
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
  Star
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="w-64 border-r bg-white h-full">
      <div className="p-4">
        <button className="sopra-red-gradient hover:opacity-90 text-white w-full rounded-md py-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
          <Plus size={16} />
          <span>Créer une tâche</span>
        </button>
      </div>
      
      <nav className="px-2 py-2">
        <div className="mb-6">
          <p className="text-xs uppercase text-jira-mediumgray font-medium px-3 mb-2">
            Général
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" className={`jira-sidebar-item ${isActive('/dashboard') ? 'active' : ''}`}>
                <Home size={18} />
                <span>Tableau de bord</span>
              </Link>
            </li>
            <li>
              <Link to="/tasks" className={`jira-sidebar-item ${isActive('/tasks') ? 'active' : ''}`}>
                <CheckCircle size={18} />
                <span>Mes tâches</span>
              </Link>
            </li>
            <li>
              <Link to="/badges" className={`jira-sidebar-item ${isActive('/badges') ? 'active' : ''}`}>
                <Award size={18} />
                <span>Mes badges</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <p className="text-xs uppercase text-jira-mediumgray font-medium px-3 mb-2">
            Planification
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/calendar" className={`jira-sidebar-item ${isActive('/calendar') ? 'active' : ''}`}>
                <Clock size={18} />
                <span>Calendrier</span>
              </Link>
            </li>
            <li>
              <Link to="/reports" className={`jira-sidebar-item ${isActive('/reports') ? 'active' : ''}`}>
                <BarChart2 size={18} />
                <span>Rapports</span>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Section pour les managers */}
        <div className="mb-6">
          <p className="text-xs uppercase text-jira-mediumgray font-medium px-3 mb-2">
            Management
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/team" className={`jira-sidebar-item ${isActive('/team') ? 'active' : ''}`}>
                <Users size={18} />
                <span>Équipe</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className={`jira-sidebar-item ${isActive('/settings') ? 'active' : ''}`}>
                <Settings size={18} />
                <span>Paramètres</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mt-8">
          <p className="text-xs uppercase text-jira-mediumgray font-medium px-3 mb-2">
            Favoris
          </p>
          <ul className="space-y-1">
            <li>
              <Link to="/starred" className="jira-sidebar-item">
                <Star size={18} className="text-secondary" />
                <span>Tâches importantes</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
