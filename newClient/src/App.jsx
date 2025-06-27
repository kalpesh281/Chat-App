import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userExists,
  userNotExists,
  getCurrentUser,
} from "./redux/reducers/authSlice";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Loader from "./components/layout/Loader";
import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showNotification,
} from "ios-notification-stack";
import "ios-notification-stack/dist/style.css";

// Lazy loading pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Lazy load admin pages
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const UserListPage = lazy(() => import("./pages/Admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"));

function App() {
  const dispatch = useDispatch();
  const {
    user: authUser,
    isAuthenticated,
    loader,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is authenticated on app load
    dispatch(getCurrentUser())
      .unwrap()
      .then((result) => {
        if (result.success) {
          console.log("User authenticated:", result.user);
        }
      })
      .catch((error) => {
        // This is expected when user is not logged in
        console.log("User not authenticated, redirecting to login");
        // Don't show error notification for unauthenticated users
      });
  }, [dispatch]);

  // Show loader while checking authentication
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* User Routes */}
            <Route
              element={
                <ProtectedRoute
                  user={isAuthenticated}
                  requiredRole="user"
                  userRole={authUser?.role}
                />
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/chat/:chatId" element={<ChatPage />} />
              <Route path="/groups" element={<GroupPage />} />
            </Route>

            {/* Admin Routes */}
            <Route
              element={
                <ProtectedRoute
                  user={isAuthenticated}
                  requiredRole="admin"
                  userRole={authUser?.role}
                />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users-list" element={<UserListPage />} />
              <Route path="/groups-list" element={<ChatManagement />} />
              <Route path="/messages-list" element={<MessageManagement />} />
            </Route>

            {/* Default redirect based on user role */}
            <Route
              path="/default"
              element={
                <Navigate
                  to={authUser?.role === "admin" ? "/dashboard" : "/"}
                  replace
                />
              }
            />

            <Route
              path="/login"
              element={
                <ProtectedRoute
                  user={!isAuthenticated}
                  redirect={authUser?.role === "admin" ? "/dashboard" : "/"}
                >
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
