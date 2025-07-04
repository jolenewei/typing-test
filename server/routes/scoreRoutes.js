import express from 'express';
import Score from '../models/scoreModel.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const newScore = new Score(req.body);
    const saved = await newScore.save();
    res.json(saved);
});

router.get('/:uid', async (req, res) => {
    const scores = await Score.find({ uid: req.params.uid }).sort({ timestamp: -1 }); 
    res.json(scores);
});

export default router;