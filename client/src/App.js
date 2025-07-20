import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TypingTest from './components/TypingTest';
import StatsChart from './components/StatsChart';
import ProfileMenu from './components/ProfileMenu';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import { auth } from './firebase';
import './styles/App.scss';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user && !user.isGuest) fetchScores(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const fetchScores = async (uid) => {
    const res = await fetch(`${API_BASE_URL}/api/scores/${uid}`);
    const data = await res.json();
    setScores(data);
  };

  const handleScoreSubmit = async ({ wpm, accuracy, wordCount }) => {
    if (user?.isGuest) return;
    const res = await fetch(`${API_BASE_URL}/api/scores/${uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: user.uid, wpm, accuracy, wordCount }),
    });
    const newScore = await res.json();
    setScores((prev) => [newScore, ...prev]);
  };

  return (
    <Routes>
      <Route path="/" element={
        user ? (
          <div className="app">
            <ProfileMenu user={user}/>
            <h1 className="title">typing test</h1>
            <TypingTest onScoreSubmit={handleScoreSubmit} />
            <StatsChart scores={scores} />
          </div>
        ) : (
          <LoginPage setUser={setUser} />
        )
      } />
      <Route path="/stats" element={<StatsPage scores={scores} />} />
    </Routes>
  );
}

export default AppWrapper;