import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";
import Index from "./pages/Index";
import BookingPage from "./pages/BookingPage";
import TicketPage from "./pages/TicketPage";
import PassengerDashboard from "./pages/PassengerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoutes from "./pages/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ScannerPage from "./pages/ScannerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/ticket/:id" element={<TicketPage />} />
          <Route path="/dashboard" element={<PassengerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/routes" element={<AdminRoutes />} />
          <Route path="/staff" element={<PassengerDashboard />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
