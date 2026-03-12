import { Outlet } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

