import { useState } from 'react'
//import Header from './components/Header'
import PageContainer from './components/PageContainer'
import AuthScreen from './components/AuthScreen'
import HomeScreen1 from './components/HomeScreen1'
//import Page5 from './pages/Page5'
//import Page6 from './pages/Page6'
import './App.css'

const SESSION_STORAGE_KEY = 'mumy_active-session';

function App() {
  //If refresh the page session load from the localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const handleLoginSuccess = (userData) => {
    const sessionUser = {
      email: userData.email,
      username: userData.username,
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setCurrentUser(null);
  };

  return (
    <PageContainer>
      {!currentUser ? (
        <AuthScreen
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <HomeScreen1
          email={currentUser.email}
          username={currentUser.username}
          onLogout={handleLogout}
        />
      )
    }
    </PageContainer>
  );
}

export default App