
import React from 'react';
import { Bell, ChevronDown, HelpCircle, Search, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
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
        
        <Button variant="ghost" asChild className="h-9 w-9 p-0 rounded-full hover:bg-gray-800/50">
          <Link to="/settings">
            <Settings size={18} className="text-gray-300" />
          </Link>
        </Button>
        
        <Link to="/settings">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="text-xs bg-[#9b87f5] text-white">US</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
