import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

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
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
            <Route path="/groups" element={<GroupPage />} />
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
      </BrowserRouter>
    </>
  );
}

export default App;
