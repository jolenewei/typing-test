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
    const data = {
        labels: scores.map(s => new Date(s.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'wpm over time',
                data: scores.map(s => s.wpm),
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };
    return <Line data={data} />;
}
export default StatsChart;