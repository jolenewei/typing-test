import { useState, useEffect, useRef } from 'react';
import wordList from '../data/words';
import '../styles/TypingTest.scss';

function TypingTest({ onScoreSubmit }) {
    const [words, setWords] = useState([]);
    const [wordCount, setWordCount] = useState(10);
    const [typedText, setTypedText] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [ended, setEnded] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleWindowClick = () => {
            containerRef.current?.focus();
        };
        window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    }, []);

    const getRandomWords = (count) => {
        const shuffled = [...wordList].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count).join(' ');
    };

    const startTest = (count) => {
        const newWords = getRandomWords(count);
        setWords(newWords.split(''));
        setWordCount(count);
        setTypedText('');
        setStartTime(null);
        setEnded(false);
        setCompletedCount(0);
        setTimeout(() => containerRef.current?.focus(), 0);
    };

    useEffect(() => {
        startTest(wordCount);
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (!ended && typedText.length === words.length) {
            setEnded(true);
            const timeTaken = (Date.now() - startTime) / 1000;
            const wpm = Math.round((typedText.trim().split(/\s+/).length / timeTaken) * 60);
            const correctChars = typedText.split('').filter((char, idx) => char === words[idx]).length;
            const accuracy = Math.round((correctChars / words.length) * 100);
            onScoreSubmit({ wpm, accuracy });
        } else {
            const completedWords = typedText.trim().split(/\s+/).length - 1;
            setCompletedCount(completedWords);
        }
    }, [typedText]);

    const handleKeyDown = (e) => {
        if (ended) return;
        if (!startTime) setStartTime(Date.now());

        if (e.key === 'Backspace') {
            setTypedText(prev => prev.slice(0, -1));
        } else if (e.key.length === 1) {
            setTypedText(prev => prev + e.key);
        }
    };

    return (
        <div className="typing-test" onKeyDown={handleKeyDown} tabIndex={0} ref={containerRef}>
            <div className="word-select">
                {[5, 10, 20, 30, 50, 80].map(count => (
                    <button key={count} onClick={() => startTest(count)}>
                        {count} words
                    </button>
                ))}
            </div>

            <div className="words-display">
                {words.map((char, i) => {
                    const isTyped = i < typedText.length;
                    const typedChar = typedText[i];
                    const className = isTyped
                        ? typedChar === char
                            ? 'correct'
                            : 'incorrect'
                        : 'untyped';

                    return (
                        <span key={i} className={className}>
                            {char}
                        </span>
                    );
                })}
            </div>

            <p>{completedCount}/{wordCount} words</p>

            {ended && (
                <div className="results">
                    <div className="stats-row">
                        <div className="stat-block">
                            <div className="label">wpm</div>
                            <div className="value">{Math.round((typedText.trim().split(/\s+/).length / ((Date.now() - startTime) / 1000)) * 60)}</div>
                        </div>
                        <div className="stat-block">
                            <div className="label">accuracy</div>
                            <div className="value">{Math.round((typedText.split('').filter((char, idx) => char === words[idx]).length / words.length) * 100)}%</div>
                        </div>
                        <div className="stat-block">
                            <div className="label">time</div>
                            <div className="value">{((Date.now() - startTime) / 1000).toFixed(2)}s</div>
                        </div>
                    </div>
                </div>
            )}
            <button class="restart" onClick={() => startTest(wordCount)}>restart</button>
        </div>
    );
}

export default TypingTest;

