import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <BottomNav />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<p>Home page (Chee's Page 3 goes here)</p>} />
          <Route
            path="/album"
            element={<Page5 onGoToDraw={() => navigate("/home")} />}
          />
          <Route
            path="/journal"
            element={<Page6 onGoToDraw={() => navigate("/home")} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;