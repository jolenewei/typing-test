import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    uid: String,
    wpm: Number,
    accuracy: Number,
    timestamp: {type: Date, default: Date.now},
});

export default mongoose.model('Score', scoreSchema);