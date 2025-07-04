import { useEffect, useState } from 'react';
import { auth } from '../firebase';

function TypingTest({ onScoreSubmit }) {
    const [text] = useState('The quick brown fox jumps over the lazy dog.');
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        if (input === text) {
            setEnded(true);
            const wpm = calculateWPM();
            const accuracy = calculateAccuracy();
            onScoreSubmit({ wpm, accuracy });
        }
    }, [input]);

    const calculateWPM = () => {
        const time = (Date.now() - startTime) / 60000; // convert ms to minutes
        return Math.round((input.length / 5) / time); // words are typically 5 characters
    };

    const calculateAccuracy = () => {
        let correct = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === text[i]) correct++;
        }
        return Math.round((correct / text.length) * 100);
    };

    return (
        <div className="typing-test">
            <p className="prompt">{text}</p>
            <input
                value={input}
                disabled={ended}
                onChange={(e) => {
                    if(!startTime) setStartTime(Date.now());
                    setInput(e.target.value);
                }}
            />
        </div>
    );
}
export default TypingTest;