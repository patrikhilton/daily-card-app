import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PageContainer from "./components/PageContainer";
import AuthScreen from "./components/AuthScreen";
import HomeScreen1 from "./components/HomeScreen1";
import BottomNav from "./components/BottomNav";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import "./App.css";

const SESSION_STORAGE_KEY = "tarot22:session";

function App() {
  const navigate = useNavigate();

  // If the page is refreshed, the session is loaded from localStorage
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
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setCurrentUser(null);
  };

  // Not logged in: only the login / sign up screen, no menu
  if (!currentUser) {
    return (
      <PageContainer>
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
      </PageContainer>
    );
  }

  // Logged in: menu + pages
  return (
    <>
      <BottomNav />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <PageContainer>
                <HomeScreen1
                  email={currentUser.email}
                  username={currentUser.username}
                  onLogout={handleLogout}
                />
              </PageContainer>
            }
          />
          <Route
            path="/album"
            element={<Page5 onGoToDraw={() => navigate("/home")} />}
          />
          <Route
            path="/journal"
            element={<Page6 onGoToDraw={() => navigate("/home")} />}
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;