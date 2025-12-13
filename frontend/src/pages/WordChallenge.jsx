import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './WordChallenge.css';

const WordChallenge = () => {
    const [wordData, setWordData] = useState(null);
    const [sentence, setSentence] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWord();
    }, []);

    const fetchWord = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/api/word');
            setWordData(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load word. Please try again.');
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!sentence.trim()) return;

        try {
            const response = await axios.post('http://localhost:8000/api/validate-sentence', {
                sentence: sentence,
                word: wordData.word
            });

            // Update stats
            await axios.post('http://localhost:8000/api/stats/progress', {
                minutes: 5,
                score: response.data.score
            });

            // Navigate to results page with state
            navigate('/result', { state: { result: response.data, originalSentence: sentence } });
        } catch (err) {
            alert('Failed to validate sentence.');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="challenge-container">
            <div className="card">
                <h1 className="title">Word of the day</h1>
                <p className="subtitle">Practice writing a meaningful sentence using today's word.</p>

                <div className="word-content">
                    <div className="image-placeholder">
                        <img src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=400&auto=format&fit=crop" alt="Word context" />
                    </div>
                    <div className="word-details">
                        <div className="level-badge">Level {wordData.word_level}</div>
                        <div className="word-header">
                            <button className="play-button"><Play size={12} fill="currentColor" /></button>
                            <h2 className="word">{wordData.word}</h2>
                        </div>
                        <div className="word-meta">Noun [run-way]</div>
                        <div className="definition">
                            <strong>Meaning:</strong> {wordData.meaning}
                        </div>
                        <div className="example">
                            "{wordData.example}"
                        </div>
                    </div>
                </div>

                <textarea
                    className="input-area"
                    placeholder={`The ${wordData.word.toLowerCase()}...`}
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                />

                <div className="actions">
                    <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Do it later</button>
                    <button className="btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default WordChallenge;
