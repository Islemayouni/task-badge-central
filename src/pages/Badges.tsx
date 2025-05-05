
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BadgesView from '@/components/badges/BadgesView';

const Badges = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <BadgesView />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Badges;
