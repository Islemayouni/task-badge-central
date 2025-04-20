
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { Task } from '@/types/task';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Exemple de tâches pour le mois en cours
  const tasks: Task[] = [
    {
      id: "T101",
      title: "Réunion de planification sprint",
      description: "Planifier les tâches pour le prochain sprint de développement",
      status: "à faire",
      priority: "medium",
      createdDate: "2025-04-18",
      dueDate: "2025-04-22",
      source: "internal",
      projectId: "P001",
    },
    {
      id: "T102",
      title: "Revue de code PR-234",
      description: "Vérifier les changements de l'API d'authentification",
      status: "en cours",
      priority: "high",
      createdDate: "2025-04-17",
      dueDate: "2025-04-20",
      source: "jira",
      projectId: "P002",
    },
    {
      id: "T103",
      title: "Documentation technique",
      description: "Mettre à jour la documentation de l'API",
      status: "à faire",
      priority: "low",
      createdDate: "2025-04-19",
      dueDate: "2025-04-28",
      source: "internal",
      projectId: "P001",
    }
  ];

  // Génération du calendrier pour le mois en cours
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Ajuster pour commencer la semaine par lundi (0 = lundi, 6 = dimanche)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = [];
    
    // Jours du mois précédent
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        currentMonth: false
      });
    }
    
    // Jours du mois en cours
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        currentMonth: true
      });
    }
    
    // Jours du mois suivant pour compléter la grille (6 semaines)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        currentMonth: false
      });
    }
    
    return days;
  };

  // Jours du mois
  const days = getDaysInMonth(currentMonth);
  
  // Nom du mois et année
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const monthYear = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  
  // Navigation entre les mois
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Vérifier si une date a des tâches
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return dueDate.getDate() === date.getDate() &&
             dueDate.getMonth() === date.getMonth() &&
             dueDate.getFullYear() === date.getFullYear();
    });
  };

  // Formater la date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Calendrier des Tâches</h1>
              <p className="text-gray-500">Planifiez vos tâches et visualisez vos échéances</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={prevMonth}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-lg font-medium">{monthYear}</span>
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={nextMonth}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
              <div 
                key={day}
                className="text-center py-2 font-medium text-sm text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-6">
            {days.map((day, index) => {
              const dayTasks = getTasksForDate(day.date);
              const isToday = new Date().toDateString() === day.date.toDateString();
              const isSelected = selectedDate && selectedDate.toDateString() === day.date.toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-md transition-all duration-200 
                    ${day.currentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                    ${isToday ? 'border-red-500' : 'border-gray-200'}
                    ${isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''}
                    hover:shadow-md cursor-pointer`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="flex justify-between items-start">
                    <span className={`font-medium ${isToday ? 'text-red-500' : ''}`}>
                      {day.date.getDate()}
                    </span>
                    {dayTasks.length > 0 && (
                      <span className="bg-primary/10 text-primary text-xs font-medium py-0.5 px-2 rounded-full">
                        {dayTasks.length}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    {dayTasks.slice(0, 2).map(task => (
                      <div 
                        key={task.id}
                        className={`text-xs p-1 rounded truncate
                          ${task.priority === 'high' ? 'bg-red-50 text-red-700' : 
                           task.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 
                           'bg-green-50 text-green-700'}`}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-gray-500 pl-1">
                        +{dayTasks.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedDate && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon size={20} className="mr-2 text-primary" />
                  {formatDate(selectedDate)}
                </CardTitle>
                <CardDescription>
                  Tâches prévues pour cette journée
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getTasksForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getTasksForDate(selectedDate).map(task => (
                      <div key={task.id} className="flex items-start p-3 border rounded-md">
                        <div className={`w-1 self-stretch rounded-full mr-3
                          ${task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-amber-500' : 
                          'bg-green-500'}`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-gray-500">{task.description}</p>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock size={14} className="mr-1" />
                              Échéance
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="flex items-center text-xs">
                              <span className={`px-2 py-1 rounded-full
                                ${task.status === 'à faire' ? 'bg-gray-100 text-gray-800' :
                                task.status === 'en cours' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'}`}>
                                {task.status}
                              </span>
                              <span className="ml-2 px-2 py-1 rounded-full bg-gray-100">
                                {task.source === 'jira' ? 'JIRA' : 'Interne'}
                              </span>
                            </div>
                            {task.priority === 'high' && (
                              <div className="flex items-center text-xs text-red-500">
                                <AlertCircle size={14} className="mr-1" />
                                Priorité haute
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon size={40} className="mx-auto mb-2 opacity-50" />
                    <p>Aucune tâche prévue pour cette journée</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Calendar;
