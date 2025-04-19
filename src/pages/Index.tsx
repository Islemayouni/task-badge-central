
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AtSign, ShieldCheck, Users, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with Gradient and Logo */}
      <div className="w-1/2 bg-gradient-to-b from-[#221F26] to-[#1A1F2C] flex flex-col items-start p-10 text-white">
        <img 
          src="/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png"
          alt="Sopra HR Logo" 
          className="w-48 mb-12 brightness-200"
        />
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6 text-white">MyTasks4YOU</h1>
          <p className="text-xl mb-8 text-gray-300">Votre plateforme de gestion de projets collaborative</p>
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-sm p-4 rounded-lg border border-[#9C27B0]/20">
              <ShieldCheck size={40} className="mb-2 text-[#9C27B0]" />
              <p className="text-gray-300">Gestion sécurisée</p>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-sm p-4 rounded-lg border border-[#9C27B0]/20">
              <Users size={40} className="mb-2 text-[#9C27B0]" />
              <p className="text-gray-300">Collaboration d'équipe</p>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-sm p-4 rounded-lg border border-[#9C27B0]/20">
              <Award size={40} className="mb-2 text-[#9C27B0]" />
              <p className="text-gray-300">Système de badges</p>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-sm p-4 rounded-lg border border-[#9C27B0]/20">
              <AtSign size={40} className="mb-2 text-[#9C27B0]" />
              <p className="text-gray-300">Communication</p>
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

      {/* Right Section */}
      <div className="w-1/2 bg-gradient-to-br from-[#6B1B9A] via-[#9C27B0] to-[#FF9800] flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#000000]/60 backdrop-blur-sm rounded-lg text-white">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">Bienvenue sur MyTasks4YOU</h2>
            <p className="mt-2 text-gray-200">Une solution complète pour la gestion de projets</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-black/20 transition-colors">
              <AtSign size={24} className="text-[#FF9800]" />
              <div>
                <h3 className="font-semibold">Communication efficace</h3>
                <p className="text-sm text-gray-200">Communiquez facilement avec vos équipes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-black/20 transition-colors">
              <Users size={24} className="text-[#FF9800]" />
              <div>
                <h3 className="font-semibold">Collaboration globale</h3>
                <p className="text-sm text-gray-200">Travaillez ensemble, peu importe la distance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-black/20 transition-colors">
              <Award size={24} className="text-[#FF9800]" />
              <div>
                <h3 className="font-semibold">Performance tracking</h3>
                <p className="text-sm text-gray-200">Suivez et améliorez vos performances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
