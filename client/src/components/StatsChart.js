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
    const reversedScores = [...scores].reverse();

    const data = {
        labels: reversedScores.map(s => new Date(s.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'wpm over time',
                data: reversedScores.map(s => s.wpm),
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: false,
            },
        },
        layout: {
            padding: 20,
        },
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">your typing progress</h2>
            <Line data={data} options={options} />
        </div>
    );
}
export default StatsChart;

