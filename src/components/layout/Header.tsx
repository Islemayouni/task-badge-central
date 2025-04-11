
import React from 'react';
import { Bell, ChevronDown, HelpCircle, Search, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="h-14 px-4 border-b flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold jira-logo text-jira-blue">TakeIt</h1>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" className="text-jira-darkgray hover:bg-jira-lightgray rounded-md text-sm px-3 py-1.5 h-auto">
            Tableau de bord
          </Button>
          <Button variant="ghost" className="text-jira-darkgray hover:bg-jira-lightgray rounded-md text-sm px-3 py-1.5 h-auto">
            Tâches
          </Button>
          <Button variant="ghost" className="text-jira-darkgray hover:bg-jira-lightgray rounded-md text-sm px-3 py-1.5 h-auto">
            Badges
            <ChevronDown size={14} className="ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative mr-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-jira-mediumgray" size={16} />
          <input
            type="text"
            placeholder="Rechercher"
            className="h-8 w-64 pl-9 pr-4 rounded-md bg-jira-lightgray text-sm focus:outline-none focus:ring-2 focus:ring-jira-blue/30"
          />
        </div>
        
        <Button variant="ghost" className="h-9 w-9 p-0 rounded-full">
          <HelpCircle size={18} className="text-jira-darkgray" />
        </Button>
        
        <Button variant="ghost" className="h-9 w-9 p-0 rounded-full">
          <Bell size={18} className="text-jira-darkgray" />
        </Button>
        
        <Button variant="ghost" className="h-9 w-9 p-0 rounded-full">
          <Settings size={18} className="text-jira-darkgray" />
        </Button>
        
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback className="text-xs bg-jira-purple text-white">US</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
