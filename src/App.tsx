
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { isManager } from "./types/user";

import Login from "./pages/Login";
import DashboardManager from "./pages/DashboardManager";
import DashboardEmployee from "./pages/DashboardEmployee";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Badges from "./pages/Badges";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Knowledge from "./pages/Knowledge";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => {
  const { user } = useAuth();

  const Dashboard = isManager(user?.role || 'employee') ? DashboardManager : DashboardEmployee;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Routes protégées pour tous les utilisateurs */}
            <Route path="/dashboard" element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute user={user}>
                <Tasks />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute user={user}>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute user={user}>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute user={user}>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/knowledge" element={
              <ProtectedRoute user={user}>
                <Knowledge />
              </ProtectedRoute>
            } />

            {/* Routes spécifiques aux employés */}
            <Route path="/badges" element={
              <ProtectedRoute user={user} requiredRole="employee">
                <Badges />
              </ProtectedRoute>
            } />

            {/* Routes spécifiques aux managers */}
            <Route path="/team" element={
              <ProtectedRoute user={user} requiredRole="manager">
                <Team />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute user={user} requiredRole="manager">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute user={user}>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId" element={
              <ProtectedRoute user={user}>
                <ProjectDetails />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
