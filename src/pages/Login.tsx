
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
      {/* Welcome Section with new gradient and black */}
      <div className="w-1/2 bg-gradient-to-br from-black via-[#6B1B9A] to-[#9C27B0] flex flex-col justify-center items-center p-10 text-white animate-slide-in-right">
        <div className="max-w-md text-center">
          <img 
            src="/lovable-uploads/325a4c76-ff38-42fe-990e-6142bf6051bf.png"
            alt="Sopra HR Logo" 
            className="mx-auto mb-8 w-48 h-auto"
          />
          <h1 className="text-4xl font-bold mb-6">MyTasks4YOU</h1>
          <p className="text-xl mb-8">Restons en contact avec MyTasks4YOU</p>
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <ShieldCheck size={40} className="mb-2" />
              <p>Gestion sécurisée</p>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <Users size={40} className="mb-2" />
              <p>Collaboration d'équipe</p>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <Award size={40} className="mb-2" />
              <p>Système de badges</p>
            </div>
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <Lock size={40} className="mb-2" />
              <p>Gestion des accès</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form with new styling */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50 animate-scale-in">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">Connectez-vous</h2>
            <p className="mt-2 text-gray-600">Entrez vos identifiants pour accéder à votre compte</p>
          </div>
          
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <AtSign size={18} />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 rounded border-gray-300"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-purple-700 hover:text-purple-500">
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 hover:opacity-90 text-white"
                disabled={loading}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Nouveau sur MyTasks4YOU? </span>
            <a href="#" className="font-medium text-purple-700 hover:text-purple-500">
              Créer un compte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
