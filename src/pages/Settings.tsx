
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  User,
  Bell,
  Shield,
  Paintbrush,
  Globe,
  Key,
  Mail,
  Smartphone,
  Clock,
  Upload,
  LogOut,
  Check
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [isPushNotifications, setIsPushNotifications] = useState(true);
  const [isBadgeNotifications, setIsBadgeNotifications] = useState(true);
  const [isTaskNotifications, setIsTaskNotifications] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is24HourFormat, setIs24HourFormat] = useState(true);
  const [language, setLanguage] = useState('fr');
  
  // Données du profil utilisateur
  const [profile, setProfile] = useState({
    firstName: 'Thomas',
    lastName: 'Durand',
    email: 'thomas.durand@entreprise.com',
    phone: '+33 6 12 34 56 78',
    role: 'Chef de projet',
    department: 'Développement',
    location: 'Paris, France'
  });
  
  // Fonction pour gérer les changements de profil
  const handleProfileChange = (field: string, value: string) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [field]: value
    }));
  };
  
  // Sauvegarder les changements
  const saveChanges = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Paramètres</h1>
              <p className="text-gray-500">Gérez votre compte et vos préférences</p>
            </div>
            <Button className="sopra-red-gradient text-white gap-2" onClick={saveChanges}>
              <Check size={16} />
              Sauvegarder les modifications
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar de navigation des paramètres */}
            <Card className="md:col-span-1">
              <CardContent className="p-0">
                <Tabs 
                  defaultValue="profile" 
                  orientation="vertical" 
                  className="w-full" 
                  onValueChange={setActiveTab}
                >
                  <TabsList className="flex flex-col h-auto bg-transparent border-r">
                    <TabsTrigger 
                      value="profile" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        Profil
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <Bell size={16} />
                        Notifications
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="appearance" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <Paintbrush size={16} />
                        Apparence
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <Shield size={16} />
                        Sécurité
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="language" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <Globe size={16} />
                        Langue et Région
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Contenu principal des paramètres */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>
                  {activeTab === 'profile' ? 'Profil Utilisateur' : 
                   activeTab === 'notifications' ? 'Préférences de Notifications' :
                   activeTab === 'appearance' ? 'Apparence' :
                   activeTab === 'security' ? 'Sécurité' :
                   activeTab === 'language' ? 'Langue et Région' :
                   'Paramètres'}
                </CardTitle>
                <CardDescription>
                  {activeTab === 'profile' ? 'Gérez vos informations personnelles et professionnelles' : 
                   activeTab === 'notifications' ? 'Contrôlez comment et quand vous recevez des notifications' :
                   activeTab === 'appearance' ? 'Personnalisez l\'apparence de l\'application' :
                   activeTab === 'security' ? 'Sécurisez votre compte' :
                   activeTab === 'language' ? 'Définissez vos préférences linguistiques et régionales' :
                   'Configurez vos préférences'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Profil Utilisateur */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback className="text-xl bg-primary text-white">TD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="gap-2">
                          <Upload size={16} />
                          Changer la photo
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input 
                              id="firstName" 
                              value={profile.firstName} 
                              onChange={(e) => handleProfileChange('firstName', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input 
                              id="lastName" 
                              value={profile.lastName} 
                              onChange={(e) => handleProfileChange('lastName', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Adresse Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={profile.email} 
                            onChange={(e) => handleProfileChange('email', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Numéro de Téléphone</Label>
                          <Input 
                            id="phone" 
                            value={profile.phone} 
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Informations Professionnelles</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Rôle</Label>
                        <Input 
                          id="role" 
                          value={profile.role} 
                          onChange={(e) => handleProfileChange('role', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Département</Label>
                        <Input 
                          id="department" 
                          value={profile.department} 
                          onChange={(e) => handleProfileChange('department', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input 
                        id="location" 
                        value={profile.location} 
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {/* Préférences de Notifications */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Canaux de Notification</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Mail size={20} className="text-primary" />
                          <div>
                            <p className="font-medium">Notifications par Email</p>
                            <p className="text-sm text-gray-500">Recevez des notifications par email</p>
                          </div>
                        </div>
                        <Switch 
                          checked={isEmailNotifications} 
                          onCheckedChange={setIsEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Smartphone size={20} className="text-primary" />
                          <div>
                            <p className="font-medium">Notifications Push</p>
                            <p className="text-sm text-gray-500">Recevez des notifications push dans l'application</p>
                          </div>
                        </div>
                        <Switch 
                          checked={isPushNotifications} 
                          onCheckedChange={setIsPushNotifications}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Types de Notification</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Badges et Récompenses</p>
                          <p className="text-sm text-gray-500">Notifications quand vous obtenez un nouveau badge</p>
                        </div>
                        <Switch 
                          checked={isBadgeNotifications} 
                          onCheckedChange={setIsBadgeNotifications}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Tâches et Assignations</p>
                          <p className="text-sm text-gray-500">Notifications pour les nouvelles tâches et mises à jour</p>
                        </div>
                        <Switch 
                          checked={isTaskNotifications} 
                          onCheckedChange={setIsTaskNotifications}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Apparence */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Préférences d'Affichage</h3>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Paintbrush size={20} className="text-primary" />
                        <div>
                          <p className="font-medium">Mode Sombre</p>
                          <p className="text-sm text-gray-500">Activer l'interface en mode sombre</p>
                        </div>
                      </div>
                      <Switch 
                        checked={isDarkMode} 
                        onCheckedChange={setIsDarkMode}
                      />
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Format d'Heure</h3>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock size={20} className="text-primary" />
                        <div>
                          <p className="font-medium">Format 24 heures</p>
                          <p className="text-sm text-gray-500">Utiliser le format 24 heures (ex: 15:00) au lieu de 12 heures (ex: 3:00 PM)</p>
                        </div>
                      </div>
                      <Switch 
                        checked={is24HourFormat} 
                        onCheckedChange={setIs24HourFormat}
                      />
                    </div>
                  </div>
                )}
                
                {/* Sécurité */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Mot de Passe</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de Passe Actuel</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nouveau Mot de Passe</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le Mot de Passe</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      
                      <Button className="gap-2">
                        <Key size={16} />
                        Changer le mot de passe
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Sessions</h3>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Vous êtes actuellement connecté sur cet appareil. Vous pouvez vous déconnecter de toutes les sessions si vous pensez que votre compte est compromis.
                      </p>
                      
                      <Button variant="destructive" className="gap-2">
                        <LogOut size={16} />
                        Déconnexion de toutes les sessions
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Langue et Région */}
                {activeTab === 'language' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Langue</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Langue de l'Interface</Label>
                      <select 
                        id="language"
                        className="w-full p-2 border rounded-md"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Format de Date et Heure</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Format de Date</Label>
                      <select 
                        id="dateFormat"
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="dd/mm/yyyy">JJ/MM/AAAA</option>
                        <option value="mm/dd/yyyy">MM/JJ/AAAA</option>
                        <option value="yyyy-mm-dd">AAAA-MM-JJ</option>
                      </select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
