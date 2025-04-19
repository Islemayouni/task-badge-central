
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
      {/* Updated Gradient Section with Sopra HR colors */}
      <div className="w-1/2 bg-gradient-to-br from-black via-[#6B1B9A] to-[#9C27B0] flex flex-col justify-center items-center p-10 text-white">
        <div className="max-w-md text-center">
          <img 
            src="/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png"
            alt="Sopra HR Logo" 
            className="w-48 mx-auto mb-8"
          />
          <h1 className="text-5xl font-bold mb-6">MyTasks4YOU</h1>
          <p className="text-xl mb-8">Votre plateforme de gestion de projets collaborative</p>
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              <ShieldCheck size={40} className="mb-2" />
              <p>Gestion sécurisée</p>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              <Users size={40} className="mb-2" />
              <p>Collaboration d'équipe</p>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              <Award size={40} className="mb-2" />
              <p>Système de badges</p>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              <AtSign size={40} className="mb-2" />
              <p>Communication</p>
            </div>
          </div>
          
          <Button 
            onClick={handleGetStarted}
            className="bg-black hover:bg-black/90 text-white font-medium px-8"
          >
            Commencer
          </Button>
        </div>
      </div>

      {/* Features Section with updated colors */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">Bienvenue sur MyTasks4YOU</h2>
            <p className="mt-2 text-gray-600">Une solution complète pour la gestion de projets</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <AtSign size={24} style={{ color: '#E1052A' }} />
              <div>
                <h3 className="font-semibold text-gray-800">Communication efficace</h3>
                <p className="text-sm text-gray-600">Communiquez facilement avec vos équipes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <Users size={24} style={{ color: '#6B1B9A' }} />
              <div>
                <h3 className="font-semibold text-gray-800">Collaboration globale</h3>
                <p className="text-sm text-gray-600">Travaillez ensemble, peu importe la distance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <Award size={24} style={{ color: '#FF4081' }} />
              <div>
                <h3 className="font-semibold text-gray-800">Performance tracking</h3>
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
