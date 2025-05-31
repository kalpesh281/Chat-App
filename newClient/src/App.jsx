import React,{lazy} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy loading pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const GroupPage = lazy(() => import('./pages/GroupPage'));
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat/chatId" element={<ChatPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />

        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
