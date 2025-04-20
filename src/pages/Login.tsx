
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AtSign, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, error } = useAuth();
  const [email, setEmail] = useState('manager@entreprise.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes connecté avec succès.",
        duration: 3000,
      });
      navigate('/dashboard');
    } catch (err) {
      toast({
        title: "Échec de la connexion",
        description: error || "Veuillez vérifier vos identifiants.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#121212]">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text sopra-gradient">TakeIt</h1>
          <p className="text-gray-400 mt-2">Connectez-vous pour accéder à la plateforme</p>
        </div>
        
        <Card className="border-[#9C27B0]/20 bg-[#1A1F2C]/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-white">Connectez-vous</CardTitle>
            <CardDescription className="text-gray-400">
              Entrez vos identifiants pour vous connecter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10 bg-[#12151D] border-[#9C27B0]/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    className="pl-10 bg-[#12151D] border-[#9C27B0]/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full sopra-gradient text-white"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs text-gray-500">Connexion par défaut :</p>
            <div className="text-xs text-gray-500">
              <div>Manager: manager@entreprise.com</div>
              <div>Employé: employee@entreprise.com</div>
              <div>Mot de passe: password (pour les deux)</div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
