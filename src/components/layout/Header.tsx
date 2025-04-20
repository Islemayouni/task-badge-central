
import React from 'react';
import { Bell, ChevronDown, HelpCircle, Search, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { currentUser, logout, isManager } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-14 px-4 border-b border-[#9C27B0]/20 bg-[#1A1F2C] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link to="/dashboard">
            <h1 className="text-xl font-bold jira-logo text-transparent bg-clip-text sopra-gradient">TakeIt</h1>
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" asChild className="text-gray-300 hover:bg-gray-800/50 rounded-md text-sm px-3 py-1.5 h-auto">
            <Link to="/dashboard">Tableau de bord</Link>
          </Button>
          <Button variant="ghost" asChild className="text-gray-300 hover:bg-gray-800/50 rounded-md text-sm px-3 py-1.5 h-auto">
            <Link to="/tasks">Tâches</Link>
          </Button>
          <Button variant="ghost" asChild className="text-gray-300 hover:bg-gray-800/50 rounded-md text-sm px-3 py-1.5 h-auto">
            <Link to="/badges">
              Badges
              <ChevronDown size={14} className="ml-1" />
            </Link>
          </Button>
          {isManager() && (
            <Button variant="ghost" asChild className="text-gray-300 hover:bg-gray-800/50 rounded-md text-sm px-3 py-1.5 h-auto">
              <Link to="/team">
                Équipe
                <ChevronDown size={14} className="ml-1" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative mr-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Rechercher"
            className="h-8 w-64 pl-9 pr-4 rounded-md bg-gray-800/50 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#9b87f5]/30 border border-gray-700"
          />
        </div>
        
        <Button variant="ghost" asChild className="h-9 w-9 p-0 rounded-full hover:bg-gray-800/50">
          <Link to="/knowledge">
            <HelpCircle size={18} className="text-gray-300" />
          </Link>
        </Button>
        
        <Button variant="ghost" asChild className="h-9 w-9 p-0 rounded-full hover:bg-gray-800/50">
          <Link to="/notifications">
            <Bell size={18} className="text-gray-300" />
          </Link>
        </Button>
        
        {isManager() && (
          <Button variant="ghost" asChild className="h-9 w-9 p-0 rounded-full hover:bg-gray-800/50">
            <Link to="/settings">
              <Settings size={18} className="text-gray-300" />
            </Link>
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.firstName} />
              <AvatarFallback className="text-xs bg-[#9b87f5] text-white">
                {currentUser ? `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}` : 'US'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser?.firstName} {currentUser?.lastName}</p>
                <p className="text-xs leading-none text-gray-500">{currentUser?.email}</p>
                <p className="text-xs leading-none text-gray-500 capitalize">
                  {currentUser?.role} {currentUser?.managerLevel && `(${currentUser.managerLevel})`}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Tableau de bord</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tasks">Mes tâches</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/badges">Mes badges</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
