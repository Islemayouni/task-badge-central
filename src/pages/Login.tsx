import { AtSign, Lock, Users, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MyTasks4YOU!",
        variant: "default",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen animate-fade-in">
      <div className="w-1/2 bg-black flex flex-col justify-center items-center text-center p-10">
        <div className="max-w-md text-center flex flex-col items-center space-y-6">
          <img 
            src="/lovable-uploads/316bfdd4-fad4-43eb-9161-d9d5b1d5430c.png" 
            alt="Sopra HR Software" 
            className="h-48 w-auto mb-4" 
          />
          <h1 className="text-4xl font-bold mb-4 text-white tracking-wide uppercase">
            MyTasks4YOU
          </h1>
          <p className="text-xl mb-6 text-gray-200 font-medium">Restons en contact avec MyTasks4YOU</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col items-center bg-[#1A1F2C]/60 rounded-lg p-4">
              <ShieldCheck size={40} className="mb-2 text-white" />
              <p className="text-gray-300 font-light">Gestion sécurisée</p>
            </div>
            <div className="flex flex-col items-center bg-[#1A1F2C]/60 rounded-lg p-4">
              <Users size={40} className="mb-2 text-white" />
              <p className="text-gray-300 font-light">Collaboration d'équipe</p>
            </div>
            <div className="flex flex-col items-center bg-[#1A1F2C]/60 rounded-lg p-4">
              <Award size={40} className="mb-2 text-white" />
              <p className="text-gray-300 font-light">Système de badges</p>
            </div>
            <div className="flex flex-col items-center bg-[#1A1F2C]/60 rounded-lg p-4">
              <Lock size={40} className="mb-2 text-white" />
              <p className="text-gray-300 font-light">Gestion des accès</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#9C27B0] to-[#FF9800]" />
        
        <div className="relative h-full flex justify-center items-center">
          <div className="w-full max-w-md p-8 space-y-6 bg-[#1A1F2C]/80 backdrop-blur-sm rounded-lg text-white">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-semibold tracking-wide">Connectez-vous</h2>
              <p className="text-white/75">Entrez vos identifiants pour accéder à votre compte</p>
              <div className="text-xs text-white/60 mt-2 space-y-1">
                <p>Pour tester les différents rôles :</p>
                <p>N1 : n1@entreprise.com</p>
                <p>N2 : n2@entreprise.com</p>
                <p>Employé : employee@entreprise.com</p>
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/60">
                      <AtSign size={18} />
                    </span>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@entreprise.com"
                      className="pl-10 bg-[#1A1F2C]/60 border-purple-500/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/60">
                      <Lock size={18} />
                    </span>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 bg-[#1A1F2C]/60 border-purple-500/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-purple-500/20 bg-[#1A1F2C]/60"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm">
                    Se souvenir de moi
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#FF9800] hover:text-[#FF9800]/80">
                    Mot de passe oublié?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#9C27B0] hover:bg-[#9C27B0]/80 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
