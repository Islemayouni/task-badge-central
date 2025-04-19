
import { AtSign, Lock, Users, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Connexion simplifiée - accepte n'importe quels identifiants
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MyTasks4YOU!",
        variant: "default",
      });
      navigate("/projects");
    }, 1000);
  };

  return (
    <div className="flex h-screen animate-fade-in">
      {/* Left Section with Black Background and Logo */}
      <div className="w-1/2 bg-black flex flex-col justify-center items-start p-10">
        <div className="max-w-md pl-4">
          <img 
            src="/lovable-uploads/930b5cde-c295-4f49-872b-0efc0d540584.png" 
            alt="Sopra HR Software" 
            className="h-20 mb-8"
          />
          <h1 className="text-4xl font-bold mb-6 text-white">MyTasks4YOU</h1>
          <p className="text-xl mb-8 text-gray-300">Restons en contact avec MyTasks4YOU</p>
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col items-center bg-gray-900/80 rounded-lg p-4 border border-gray-800">
              <ShieldCheck size={40} className="mb-2 text-white" />
              <p className="text-gray-300">Gestion sécurisée</p>
            </div>
            <div className="flex flex-col items-center bg-gray-900/80 rounded-lg p-4 border border-gray-800">
              <Users size={40} className="mb-2 text-white" />
              <p className="text-gray-300">Collaboration d'équipe</p>
            </div>
            <div className="flex flex-col items-center bg-gray-900/80 rounded-lg p-4 border border-gray-800">
              <Award size={40} className="mb-2 text-white" />
              <p className="text-gray-300">Système de badges</p>
            </div>
            <div className="flex flex-col items-center bg-gray-900/80 rounded-lg p-4 border border-gray-800">
              <Lock size={40} className="mb-2 text-white" />
              <p className="text-gray-300">Gestion des accès</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-1/2 bg-gradient-to-br from-[#6B1B9A] via-[#9C27B0] to-[#FF9800] flex justify-center items-center animate-scale-in">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#000000]/60 backdrop-blur-sm rounded-lg text-white">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">Connectez-vous</h2>
            <p className="mt-2 text-white/80">Entrez vos identifiants pour accéder à votre compte</p>
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
                    placeholder="votre@email.com"
                    className="pl-10 bg-[#1A1F2C]/60 border-[#9C27B0]/20 text-white placeholder:text-white/60"
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
                    className="pl-10 bg-[#1A1F2C]/60 border-[#9C27B0]/20 text-white placeholder:text-white/60"
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
                  className="h-4 w-4 rounded border-[#9C27B0]/20 bg-[#1A1F2C]/60"
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
              className="w-full bg-[#9C27B0] hover:bg-[#6B1B9A] text-white"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
