import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Loader from "./components/layout/Loader";
import Dashboard from "./pages/Admin/Dashboard";
import UserListPage from "./pages/Admin/UserManagement";
import ChatManagement from "./pages/Admin/ChatManagement";
import MessageManagement from "./pages/Admin/MessageManagement";

// Lazy loading pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const user = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat/:chatId" element={<ChatPage />} />
              <Route path="/groups" element={<GroupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users-list" element={<UserListPage />} />
              <Route path="/groups-list" element={<ChatManagement />} />
              <Route path="/messages-list" element={<MessageManagement />} />
            </Route>

            <Route
              path="/login"
              element={
                <ProtectedRoute user={!user} redirect="/">
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
