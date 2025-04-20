
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Bookmark, 
  BookOpen, 
  FileText, 
  Clock, 
  ThumbsUp, 
  MessageSquare, 
  Plus, 
  Share, 
  Filter, 
  ArrowRight,
  Star,
  Tag
} from 'lucide-react';

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Données de démonstration pour les articles
  const articles = [
    {
      id: "A001",
      title: "Guide complet de JIRA pour les développeurs",
      summary: "Un tutoriel détaillé sur l'utilisation de JIRA pour la gestion de projet agile, avec des conseils pratiques pour les développeurs.",
      author: {
        name: "Thomas Durand",
        avatar: "https://github.com/shadcn.png"
      },
      category: "tutoriel",
      tags: ["jira", "agile", "gestion-projet"],
      createdAt: "2025-03-15",
      views: 256,
      likes: 42,
      comments: 8,
      isBookmarked: true,
      isFeatured: true
    },
    {
      id: "A002",
      title: "Comment obtenir le badge 'Expert en Performance'",
      summary: "Découvrez les étapes nécessaires pour obtenir le badge 'Expert en Performance' dans notre système de reconnaissance.",
      author: {
        name: "Sophie Martin",
        avatar: ""
      },
      category: "guide",
      tags: ["badges", "performance", "astuces"],
      createdAt: "2025-03-28",
      views: 187,
      likes: 35,
      comments: 12,
      isBookmarked: false,
      isFeatured: false
    },
    {
      id: "A003",
      title: "Meilleures pratiques pour la gestion des tâches",
      summary: "Un ensemble de techniques éprouvées pour augmenter votre productivité et mieux gérer vos tâches quotidiennes.",
      author: {
        name: "Marie Laurent",
        avatar: ""
      },
      category: "article",
      tags: ["productivité", "gestion-tâches", "organisation"],
      createdAt: "2025-04-05",
      views: 134,
      likes: 29,
      comments: 6,
      isBookmarked: true,
      isFeatured: false
    },
    {
      id: "A004",
      title: "Nouveautés de la plateforme MyTasks4YOU v2.1",
      summary: "Découvrez les dernières fonctionnalités et améliorations apportées à notre plateforme dans la version 2.1.",
      author: {
        name: "Marc Dubois",
        avatar: ""
      },
      category: "annonce",
      tags: ["mise-à-jour", "fonctionnalités", "nouveautés"],
      createdAt: "2025-04-12",
      views: 202,
      likes: 18,
      comments: 4,
      isBookmarked: false,
      isFeatured: true
    },
    {
      id: "A005",
      title: "Intégration de l'API JIRA avec MyTasks4YOU",
      summary: "Guide technique pour configurer et optimiser l'intégration entre JIRA et notre plateforme MyTasks4YOU.",
      author: {
        name: "Thomas Durand",
        avatar: "https://github.com/shadcn.png"
      },
      category: "technique",
      tags: ["api", "jira", "intégration", "technique"],
      createdAt: "2025-04-08",
      views: 98,
      likes: 15,
      comments: 3,
      isBookmarked: false,
      isFeatured: false
    }
  ];
  
  // Filtrer les articles en fonction de la recherche et de l'onglet actif
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'bookmarked') {
      return matchesSearch && article.isBookmarked;
    } else if (activeTab === 'featured') {
      return matchesSearch && article.isFeatured;
    } else {
      return matchesSearch && article.category === activeTab;
    }
  });
  
  // Obtenir les initiales pour l'avatar
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(' ').map(n => n.charAt(0)).join('');
  };
  
  // Formater la date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Obtenir la couleur pour la catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutoriel': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'guide': return 'bg-green-100 text-green-800 border-green-200';
      case 'article': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'annonce': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'technique': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Base de Connaissances</h1>
              <p className="text-gray-500">Documentation, guides et ressources partagées</p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="sopra-red-gradient text-white">
                <Plus size={16} className="mr-2" />
                Nouvel Article
              </Button>
            </div>
          </div>
          
          {/* Barre de recherche et filtres */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher des articles, guides..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    Filtrer
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Tag size={16} />
                    Tags
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="bookmarked">Favoris</TabsTrigger>
              <TabsTrigger value="featured">En vedette</TabsTrigger>
              <TabsTrigger value="tutoriel">Tutoriels</TabsTrigger>
              <TabsTrigger value="guide">Guides</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="annonce">Annonces</TabsTrigger>
              <TabsTrigger value="technique">Technique</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {/* Articles mis en avant */}
              {activeTab === 'all' && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <Star size={18} className="mr-2 text-amber-500" />
                    Articles en vedette
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles
                      .filter(article => article.isFeatured)
                      .slice(0, 2)
                      .map(article => (
                        <Card key={article.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Badge className={getCategoryColor(article.category)}>
                                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bookmark size={16} className={article.isBookmarked ? 'fill-primary text-primary' : ''} />
                              </Button>
                            </div>
                            <CardTitle className="mt-2 hover:text-primary cursor-pointer">
                              {article.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {article.summary}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={article.author.avatar} />
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {getInitials(article.author.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{article.author.name}</span>
                              <span className="mx-2">·</span>
                              <Clock size={14} className="mr-1" />
                              <span>{formatDate(article.createdAt)}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-0">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <ThumbsUp size={14} className="mr-1" />
                                {article.likes}
                              </div>
                              <div className="flex items-center">
                                <MessageSquare size={14} className="mr-1" />
                                {article.comments}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary gap-1">
                              Lire <ArrowRight size={14} />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Liste principale d'articles */}
              <div>
                {activeTab !== 'all' && (
                  <h2 className="text-lg font-medium mb-4">
                    {activeTab === 'bookmarked' ? 'Articles favoris' : 
                     activeTab === 'featured' ? 'Articles en vedette' :
                     `Articles de type ${activeTab}`}
                  </h2>
                )}
                
                <div className="space-y-4">
                  {filteredArticles.map(article => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-16 h-16 flex items-center justify-center rounded-md bg-primary/10">
                            <FileText size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <Badge className={getCategoryColor(article.category)}>
                                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                                </Badge>
                                {article.isFeatured && (
                                  <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-800 gap-1">
                                    <Star size={12} className="fill-amber-500 text-amber-500" />
                                    En vedette
                                  </Badge>
                                )}
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bookmark size={16} className={article.isBookmarked ? 'fill-primary text-primary' : ''} />
                              </Button>
                            </div>
                            <h3 className="font-medium text-lg mb-1 hover:text-primary cursor-pointer">
                              {article.title}
                            </h3>
                            <p className="text-gray-500 mb-4 line-clamp-2">
                              {article.summary}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="bg-gray-50">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={article.author.avatar} />
                                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                    {getInitials(article.author.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{article.author.name}</span>
                                <span className="mx-2">·</span>
                                <Clock size={14} className="mr-1" />
                                <span>{formatDate(article.createdAt)}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <ThumbsUp size={14} className="mr-1" />
                                    {article.likes}
                                  </div>
                                  <div className="flex items-center">
                                    <MessageSquare size={14} className="mr-1" />
                                    {article.comments}
                                  </div>
                                  <div className="flex items-center">
                                    <BookOpen size={14} className="mr-1" />
                                    {article.views}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Share size={16} />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Lire
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredArticles.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border">
                      <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                      <h3 className="text-xl font-medium mb-1">Aucun article trouvé</h3>
                      <p className="text-gray-500">Essayez d'autres termes de recherche ou créez un nouvel article</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Knowledge;
