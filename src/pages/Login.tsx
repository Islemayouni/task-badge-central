
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AtSign, Lock, TriangleAlert } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simuler un délai d'authentification
    setTimeout(() => {
      // Pour cette démo, nous acceptons n'importe quel email/mot de passe
      // Dans une vraie application, vous feriez une vérification d'authentification ici
      setLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur TakeIt",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-jira-lightgray px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold jira-logo text-jira-blue">TakeIt</h1>
          <p className="text-jira-mediumgray mt-2">
            Plateforme de Gestion des Tâches et d'Attribution de Badges
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">Se connecter</CardTitle>
            <CardDescription>
              Accédez à votre tableau de bord de gestion des tâches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-md flex items-center gap-2 text-sm text-red-600">
                  <TriangleAlert size={16} />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AtSign size={18} />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@entreprise.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                  <a href="#" className="text-xs text-jira-blue hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-jira-blue hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-jira-mediumgray">
              Nouveau sur TakeIt? <a href="#" className="text-jira-blue hover:underline">Créer un compte</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
