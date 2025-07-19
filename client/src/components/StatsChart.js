import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function StatsChart({ scores }) {
    const [metric, setMetric] = useState('wpm');
    const [range, setRange] = useState('all');

    const reversedScores = [...scores].reverse();

    // filter by date range
    const now = new Date();
    const filteredScores = reversedScores.filter(score => {
        const date = new Date(score.timestamp);
        if (range === 'week') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            return date >= oneWeekAgo;
        } else if (range === 'month') {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return date >= oneMonthAgo;
        }
        return true;
    });

    const data = {
        labels: filteredScores.map(s => new Date(s.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: metric === 'wpm' ? 'wpm over time' : 'accuracy over time',
                data: filteredScores.map(s => metric === 'wpm' ? s.wpm : s.accuracy),
                borderColor: metric === 'wpm' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
                tension: 0.2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false },
        },
        layout: { padding: 20 },
    };

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h2 className="chart-title">your typing progress</h2>
                <div className="chart-controls">
                    <select value={metric} onChange={e => setMetric(e.target.value)}>
                        <option value="wpm">wpm</option>
                        <option value="accuracy">accuracy</option>
                    </select>
                    <select value={range} onChange={e => setRange(e.target.value)}>
                        <option value="all">all time</option>
                        <option value="week">past week</option>
                        <option value="month">past month</option>
                    </select>
                </div>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}

export default StatsChart;

