import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TicketPage from "./pages/TicketPage";
import ScannerPage from "./pages/ScannerPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import PassengerLoginPage from "@/auth/PassengerLoginPage";
import StaffLoginPage from "@/auth/StaffLoginPage";
import AdminLoginPage from "@/auth/AdminLoginPage";
import PublicLayout from "@/public/components/PublicLayout";
import AdminLayout from "@/admin/components/AdminLayout";
import { RequireAdmin, RequirePassenger, RequireStaff } from "@/auth/route-guards";
import BookTicketPage from "@/public/pages/BookTicketPage";
import MyTicketsPage from "@/public/pages/MyTicketsPage";
import SearchBusPage from "@/public/pages/SearchBusPage";
import ContactPage from "@/public/pages/ContactPage";
import AdminDashboardPage from "@/admin/pages/AdminDashboardPage";
import AdminRoutesPage from "@/admin/pages/AdminRoutesPage";
import ManageBusesPage from "@/admin/pages/ManageBusesPage";
import ManageSchedulesPage from "@/admin/pages/ManageSchedulesPage";
import ManageBookingsPage from "@/admin/pages/ManageBookingsPage";
import ManageUsersPage from "@/admin/pages/ManageUsersPage";
import AdminReportsPage from "@/admin/pages/AdminReportsPage";
import StaffDashboardPage from "@/staff/pages/StaffDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public website */}
          <Route element={<PublicLayout />}>
            <Route index element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/passenger" element={<PassengerLoginPage />} />
            <Route path="/login/staff" element={<StaffLoginPage />} />
            <Route path="/search" element={<SearchBusPage />} />
            <Route
              path="/book"
              element={
                <RequirePassenger>
                  <BookTicketPage />
                </RequirePassenger>
              }
            />
            <Route
              path="/ticket/:id"
              element={
                <RequirePassenger>
                  <TicketPage />
                </RequirePassenger>
              }
            />
            <Route
              path="/my-tickets"
              element={
                <RequirePassenger>
                  <MyTicketsPage />
                </RequirePassenger>
              }
            />
            <Route
              path="/staff"
              element={
                <RequireStaff>
                  <StaffDashboardPage />
                </RequireStaff>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            {/* Existing demo route for conductors */}
            <Route path="/scanner" element={<ScannerPage />} />
          </Route>

          {/* Admin authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin portal */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="routes" element={<AdminRoutesPage />} />
            <Route path="buses" element={<ManageBusesPage />} />
            <Route path="schedules" element={<ManageSchedulesPage />} />
            <Route path="bookings" element={<ManageBookingsPage />} />
            <Route path="users" element={<ManageUsersPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
