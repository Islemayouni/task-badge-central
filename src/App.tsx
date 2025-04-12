
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Ces routes seront implémentées ultérieurement */}
          <Route path="/tasks" element={<Dashboard />} />
          <Route path="/badges" element={<Dashboard />} />
          <Route path="/calendar" element={<Dashboard />} />
          <Route path="/reports" element={<Dashboard />} />
          <Route path="/team" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/starred" element={<Dashboard />} />
          <Route path="/knowledge" element={<Dashboard />} />
          <Route path="/notifications" element={<Dashboard />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
