import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({
  children,
  user,
  redirect = "/login",
  requiredRole = null,
}) {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  if (requiredRole && currentUser && currentUser.role !== requiredRole) {
    let redirectPath = "/";
    if (currentUser.role === "admin") {
      redirectPath = "/dashboard";
    }
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
