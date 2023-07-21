import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Landing from './components/info/Landing';
import { Suspense } from 'react';
import ChatPage from './components/chat/ChatPage';
import FriendsPage from './components/chat/FriendsPage';

function App() {
  return (

    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/main/chat" element={<ChatPage />} />
          <Route path="/main/friends" element={<FriendsPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
