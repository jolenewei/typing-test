import { useState, useEffect } from 'react';
import TypingTest from './components/TypingTest';
import StatsChart from './components/StatsChart';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './styles/App.scss';

function App() {
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            fetchScores();
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const handleScoreSubmit = async ({ wpm, accuracy }) => {
        const res = await fetch('http://localhost:5000/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: user.uid, wpm, accuracy }),
        });
        const newScore = await res.json();
        setScores([newScore, ...scores]);
    };

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/api/scores/${user.uid}`)
                .then(res => res.json())
                .then(setScores);
        }
    }, [user]);

    if (!user) return <button onClick={handleLogin}>login with google</button>

    return (
        <div className="app">
            <h1>typing test</h1>
            <TypingTest onScoreSubmit={handleScoreSubmit} />
            <StatsChart scores={scores} />
        </div>
    );
}
export default App;