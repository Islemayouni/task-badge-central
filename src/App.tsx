
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardManager from './pages/DashboardManager'
import DashboardEmployee from './pages/DashboardEmployee'
import Team from './pages/Team'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Badges from './pages/Badges'
import Knowledge from './pages/Knowledge'
import Notifications from './pages/Notifications'
import NotFound from './pages/NotFound'
import Index from './pages/Index'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import './App.css'

function App() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/manager" element={<DashboardManager />} />
            <Route path="/dashboard/employee" element={<DashboardEmployee />} />
            <Route path="/team" element={<Team />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
