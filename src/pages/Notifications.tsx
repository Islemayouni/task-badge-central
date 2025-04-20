
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Check,
  CheckCheck,
  ChevronRight,
  Settings,
  Trash2,
  Award,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  Clock,
  UserPlus
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'badge' | 'task' | 'comment' | 'deadline' | 'system' | 'team';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  source?: {
    name: string;
    avatar?: string;
  };
  action?: string;
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Données de démonstration pour les notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "N001",
      type: "badge",
      title: "Nouveau badge débloqué !",
      content: "Félicitations ! Vous avez débloqué le badge 'Performant' niveau 2.",
      time: "2025-04-19T15:30:00",
      isRead: false,
      action: "Voir le badge"
    },
    {
      id: "N002",
      type: "task",
      title: "Tâche assignée",
      content: "Thomas Durand vous a assigné la tâche 'Configuration de l'environnement de développement'.",
      time: "2025-04-19T14:15:00",
      isRead: false,
      source: {
        name: "Thomas Durand",
        avatar: "https://github.com/shadcn.png"
      },
      action: "Voir la tâche"
    },
    {
      id: "N003",
      type: "comment",
      title: "Nouveau commentaire",
      content: "Sophie Martin a commenté sur votre tâche 'Optimisation des performances'.",
      time: "2025-04-19T10:45:00",
      isRead: true,
      source: {
        name: "Sophie Martin"
      },
      action: "Répondre"
    },
    {
      id: "N004",
      type: "deadline",
      title: "Échéance proche",
      content: "La tâche 'Revue du code de la v0.1' doit être terminée dans 2 jours.",
      time: "2025-04-18T09:20:00",
      isRead: true,
      action: "Voir la tâche"
    },
    {
      id: "N005",
      type: "system",
      title: "Maintenance planifiée",
      content: "Une maintenance du système est prévue pour demain à 22h00. La plateforme sera inaccessible pendant environ 30 minutes.",
      time: "2025-04-18T08:10:00",
      isRead: false
    },
    {
      id: "N006",
      type: "task",
      title: "Tâche terminée",
      content: "Marc Dubois a marqué la tâche 'Tests d'intégration' comme terminée.",
      time: "2025-04-17T16:40:00",
      isRead: true,
      source: {
        name: "Marc Dubois"
      },
      action: "Vérifier"
    },
    {
      id: "N007",
      type: "team",
      title: "Nouveau membre dans l'équipe",
      content: "Julie Leclerc a rejoint l'équipe en tant que UX/UI Designer.",
      time: "2025-04-16T11:25:00",
      isRead: true,
      source: {
        name: "Julie Leclerc"
      },
      action: "Accueillir"
    }
  ]);
  
  // Filtrer les notifications selon l'onglet actif
  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return notifications;
    } else if (activeTab === 'unread') {
      return notifications.filter(notif => !notif.isRead);
    } else {
      return notifications.filter(notif => notif.type === activeTab);
    }
  };
  
  const filteredNotifications = getFilteredNotifications();
  
  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({
      ...notif,
      isRead: true
    })));
  };
  
  // Marquer une notification comme lue
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };
  
  // Supprimer une notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };
  
  // Obtenir l'icône selon le type de notification
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'badge': return <Award size={18} className="text-purple-500" />;
      case 'task': return <CheckCircle size={18} className="text-blue-500" />;
      case 'comment': return <MessageSquare size={18} className="text-green-500" />;
      case 'deadline': return <Calendar size={18} className="text-amber-500" />;
      case 'system': return <AlertCircle size={18} className="text-red-500" />;
      case 'team': return <UserPlus size={18} className="text-teal-500" />;
      default: return <Bell size={18} className="text-gray-500" />;
    }
  };
  
  // Formater la date relative
  const getRelativeTime = (timeString: string) => {
    const now = new Date();
    const time = new Date(timeString);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "à l'instant";
    } else if (diffInSeconds < 3600) {
      return `il y a ${Math.floor(diffInSeconds / 60)} min`;
    } else if (diffInSeconds < 86400) {
      return `il y a ${Math.floor(diffInSeconds / 3600)} h`;
    } else {
      return time.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };
  
  // Obtenir les initiales pour l'avatar
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(' ').map(n => n.charAt(0)).join('');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Notifications</h1>
              <p className="text-gray-500">Restez informé des dernières mises à jour</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
                <CheckCheck size={16} />
                Tout marquer comme lu
              </Button>
              <Button variant="outline" size="icon">
                <Settings size={16} />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Panneau de navigation des notifications */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} className="text-primary" />
                  Catégories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs 
                  defaultValue="all" 
                  orientation="vertical" 
                  className="w-full" 
                  onValueChange={setActiveTab}
                >
                  <TabsList className="flex flex-col h-auto bg-transparent border-r">
                    <TabsTrigger 
                      value="all" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <Bell size={16} />
                          Toutes
                        </div>
                        <Badge>{notifications.length}</Badge>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="unread" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          Non lues
                        </div>
                        <Badge>{notifications.filter(n => !n.isRead).length}</Badge>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="badge" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <Award size={16} />
                          Badges
                        </div>
                        <Badge>{notifications.filter(n => n.type === 'badge').length}</Badge>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="task" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} />
                          Tâches
                        </div>
                        <Badge>{notifications.filter(n => n.type === 'task').length}</Badge>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="comment" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          Commentaires
                        </div>
                        <Badge>{notifications.filter(n => n.type === 'comment').length}</Badge>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="system" 
                      className="justify-start border-r-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <AlertCircle size={16} />
                          Système
                        </div>
                        <Badge>{notifications.filter(n => n.type === 'system').length}</Badge>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Liste des notifications */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>
                  {activeTab === 'all' ? 'Toutes les notifications' : 
                   activeTab === 'unread' ? 'Notifications non lues' : 
                   activeTab === 'badge' ? 'Notifications de badges' :
                   activeTab === 'task' ? 'Notifications de tâches' :
                   activeTab === 'comment' ? 'Notifications de commentaires' :
                   activeTab === 'system' ? 'Notifications système' :
                   'Notifications'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-4 border rounded-lg relative transition-colors
                          ${notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-100'}`}
                      >
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-gray-500">
                              {getRelativeTime(notification.time)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                          
                          {notification.source && (
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Avatar className="h-5 w-5 mr-2">
                                <AvatarImage src={notification.source.avatar} />
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {getInitials(notification.source.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{notification.source.name}</span>
                            </div>
                          )}
                          
                          {notification.action && (
                            <div className="mt-2">
                              <Button variant="link" className="p-0 h-auto text-primary flex items-center">
                                {notification.action}
                                <ChevronRight size={16} className="ml-1" />
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-2">
                          {!notification.isRead && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:bg-blue-100"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check size={16} />
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                        
                        {!notification.isRead && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-tl-lg rounded-bl-lg"></div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell size={64} className="text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-1">Aucune notification</h3>
                    <p className="text-gray-500">
                      {activeTab === 'unread' 
                        ? "Vous avez lu toutes vos notifications." 
                        : "Vous n'avez pas encore reçu de notifications de ce type."}
                    </p>
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

export default Notifications;
