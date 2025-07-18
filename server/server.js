import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import scoreRoutes from './routes/scoreRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/scores', scoreRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Typing Test API is running');
});

app.listen(5050,  () => console.log('Server running on port 5050'));
