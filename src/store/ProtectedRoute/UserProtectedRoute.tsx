import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const UserProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isUserAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default UserProtectedRoute;
