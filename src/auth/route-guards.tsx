import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "@/lib/store";

interface GuardProps {
  children: ReactNode;
}

export function RequireAdmin({ children }: GuardProps) {
  const { isLoggedIn, currentRole } = useAppStore();
  const location = useLocation();

  if (!isLoggedIn || currentRole !== "admin") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
}

export function RequirePassenger({ children }: GuardProps) {
  const { isLoggedIn, currentRole } = useAppStore();
  const location = useLocation();

  if (!isLoggedIn || currentRole !== "passenger") {
    if (!isLoggedIn) {
      return (
        <Navigate
          to="/login"
          replace
          state={{ from: location.pathname + location.search }}
        />
      );
    }

    if (currentRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function RequireStaff({ children }: GuardProps) {
  const { isLoggedIn, currentRole } = useAppStore();
  const location = useLocation();

  if (!isLoggedIn || currentRole !== "staff") {
    if (!isLoggedIn) {
      return (
        <Navigate
          to="/login"
          replace
          state={{ from: location.pathname + location.search }}
        />
      );
    }
    if (currentRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (currentRole === "passenger") {
      return <Navigate to="/my-tickets" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

