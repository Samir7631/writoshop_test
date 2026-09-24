import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth, type UserRole } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role?: UserRole;
}) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return <>{children}</>;
}
