import React, { useEffect, useState } from 'react';
import StatsChart from '../components/StatsChart';
import { auth } from '../firebase';
import '../styles/StatsPage.scss';
import { useNavigate } from 'react-router-dom';

function StatsPage() {
  const [scores, setScores] = useState([]);
  const [highScores, setHighScores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/scores/${uid}`);
      const data = await res.json();
      setScores(data);

      // compute high scores for each word count
      const grouped = {};
      data.forEach(score => {
        const wc = score.wordCount || 10; // fallback if not stored
        if (!grouped[wc] || grouped[wc].wpm < score.wpm) {
          grouped[wc] = score;
        }
      });
      setHighScores(grouped);
    };

    fetchScores();
  }, []);

  return (
    <div className="stats-page">
    <button className="back-button" onClick={() => navigate('/')}> back to typing ... </button>
      <h2>your typing stats</h2>

      <div className="high-scores">
        <h3>high scores</h3>
        <ul>
          {[5, 10, 20, 30, 50].map(count => (
            <li key={count}>
              <strong>{count} words:</strong> {highScores[count]?.wpm || '—'} wpm, {highScores[count]?.accuracy || '—'}% accuracy
            </li>
          ))}
        </ul>
      </div>

      <div className="chart-container">
        <StatsChart scores={scores} />
      </div>
    </div>
  );
}

export default StatsPage;
