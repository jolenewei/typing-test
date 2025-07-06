import express from 'express';
import Score from '../models/Score.js';

const router = express.Router();

// get all scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ timestamp: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// test route
router.get('/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

// get scores for a specific user
router.get('/:uid', async (req, res) => {
  try {
    const scores = await Score.find({ uid: req.params.uid }).sort({ timestamp: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// submit a new score
router.post('/', async (req, res) => {
  try {
    const newScore = new Score(req.body);
    const saved = await newScore.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;