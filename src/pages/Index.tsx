
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AtSign, ShieldCheck, Users, Award, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Gradient Section */}
      <div className="w-1/2 bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 flex flex-col justify-center items-center p-10 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-bold mb-6">MyTasks4YOU</h1>
          <p className="text-xl mb-8">Votre plateforme de gestion de projets collaborative</p>
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col items-center">
              <ShieldCheck size={40} className="mb-2" />
              <p>Gestion sécurisée</p>
            </div>
            <div className="flex flex-col items-center">
              <Users size={40} className="mb-2" />
              <p>Collaboration d'équipe</p>
            </div>
            <div className="flex flex-col items-center">
              <Award size={40} className="mb-2" />
              <p>Système de badges</p>
            </div>
            <div className="flex flex-col items-center">
              <Lock size={40} className="mb-2" />
              <p>Gestion des accès</p>
            </div>
          </div>
          
          <Button 
            onClick={handleGetStarted}
            variant="outline" 
            className="bg-white text-purple-700 hover:bg-purple-50 mt-4"
          >
            Commencer
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Bienvenue sur MyTasks4YOU</h2>
            <p className="mt-2 text-gray-600">Une solution complète pour la gestion de projets</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <AtSign size={24} className="text-purple-700" />
              <div>
                <h3 className="font-semibold text-gray-800">Communication efficace</h3>
                <p className="text-sm text-gray-600">Communiquez facilement avec vos équipes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Users size={24} className="text-pink-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Collaboration globale</h3>
                <p className="text-sm text-gray-600">Travaillez ensemble, peu importe la distance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Award size={24} className="text-orange-500" />
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

