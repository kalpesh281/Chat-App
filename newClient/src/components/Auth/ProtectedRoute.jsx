import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkCredentials } from "../../redux/reducers/authSlice";
import Loader from "../layout/Loader";
import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showNotification,
} from "ios-notification-stack";
import "ios-notification-stack/dist/style.css";

function ProtectedRoute({
  children,
  user,
  redirect = "/login",
  requiredRole = null,
  userRole = null,
}) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      // If no user, no access
      if (!user) {
        setHasAccess(false);
        return;
      }

      // If no role requirement, just check if user exists
      if (!requiredRole) {
        setHasAccess(true);
        return;
      }

      // If role requirement exists, verify with actual user data
      if (currentUser && requiredRole) {
        // Simple role check - if user role matches required role
        if (currentUser.role === requiredRole) {
          setHasAccess(true);
          return;
        }

        // If role doesn't match, optionally verify with backend
        setIsVerifying(true);

        try {
          const result = await dispatch(
            checkCredentials({
              username: currentUser.username,
              role: requiredRole,
            })
          ).unwrap();

          if (result.success) {
            setHasAccess(true);
          } else {
            setHasAccess(false);
            showError(`Access denied. ${requiredRole} role required.`);
          }
        } catch (error) {
          console.error("Credential check failed:", error);
          setHasAccess(false);

          // Don't show error for role mismatch, just deny access silently
          if (currentUser.role !== requiredRole) {
            console.log(
              `User role (${currentUser.role}) doesn't match required role (${requiredRole})`
            );
          } else {
            showError("Access verification failed");
          }
        } finally {
          setIsVerifying(false);
        }
      } else {
        setHasAccess(false);
      }
    };

    verifyAccess();
  }, [user, requiredRole, currentUser, dispatch]);

  // Show loader while verifying credentials
  if (isVerifying) {
    return <Loader />;
  }

  // If user doesn't exist or doesn't have access, redirect
  if (!user || (requiredRole && !hasAccess)) {
    // Smart redirection based on user role
    let redirectPath = redirect;

    if (currentUser) {
      if (currentUser.role === "admin" && requiredRole === "user") {
        redirectPath = "/dashboard"; // Admin trying to access user routes -> go to dashboard
      } else if (currentUser.role === "user" && requiredRole === "admin") {
        redirectPath = "/"; // User trying to access admin routes -> go to home
      }
    }

    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
