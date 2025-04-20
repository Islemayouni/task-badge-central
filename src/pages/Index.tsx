
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AtSign, ShieldCheck, Users, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with White Background */}
      <div className="w-1/2 bg-white flex flex-col items-start p-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6 text-[#333333]">MyTasks4YOU</h1>
          <p className="text-xl mb-8 text-[#666666]">Restons en contact avec MyTasks4YOU</p>
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col items-center bg-[#E5DEFF] p-4 rounded-lg border border-[#9b87f5]/20 hover:shadow-md transition-all">
              <ShieldCheck size={40} className="mb-2 text-[#6E59A5]" />
              <p className="text-[#333333]">Gestion sécurisée</p>
            </div>
            <div className="flex flex-col items-center bg-[#FDE1D3] p-4 rounded-lg border border-[#F97316]/20 hover:shadow-md transition-all">
              <Users size={40} className="mb-2 text-[#F97316]" />
              <p className="text-[#333333]">Collaboration d'équipe</p>
            </div>
            <div className="flex flex-col items-center bg-[#F2FCE2] p-4 rounded-lg border border-[#36B37E]/20 hover:shadow-md transition-all">
              <Award size={40} className="mb-2 text-[#36B37E]" />
              <p className="text-[#333333]">Système de badges</p>
            </div>
            <div className="flex flex-col items-center bg-[#D3E4FD] p-4 rounded-lg border border-[#0EA5E9]/20 hover:shadow-md transition-all">
              <AtSign size={40} className="mb-2 text-[#0EA5E9]" />
              <p className="text-[#333333]">Communication</p>
            </div>
          </div>
          
          <Button 
            onClick={handleGetStarted}
            className="bg-[#9C27B0] hover:bg-[#6B1B9A] text-white font-medium px-8"
          >
            Commencer
          </Button>
        </div>
      </div>

      {/* Right Section with subtle gray background */}
      <div className="w-1/2 bg-white flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#F1F1F1] rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#1A1F2C]">Bienvenue sur MyTasks4YOU</h2>
            <p className="mt-2 text-gray-600">Une solution complète pour la gestion de projets</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <AtSign size={24} className="text-[#0EA5E9]" />
              <div>
                <h3 className="font-semibold text-[#1A1F2C]">Communication efficace</h3>
                <p className="text-sm text-gray-600">Communiquez facilement avec vos équipes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <Users size={24} className="text-[#F97316]" />
              <div>
                <h3 className="font-semibold text-[#1A1F2C]">Collaboration globale</h3>
                <p className="text-sm text-gray-600">Travaillez ensemble, peu importe la distance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <Award size={24} className="text-[#36B37E]" />
              <div>
                <h3 className="font-semibold text-[#1A1F2C]">Performance tracking</h3>
                <p className="text-sm text-gray-600">Suivez et améliorez vos performances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
