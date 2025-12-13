import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChallengeResult.css';

const ChallengeResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { result, originalSentence } = location.state || {}; // Expect result from navigation state

    if (!result) {
        return <div className="error">No result data found. Please try again.</div>;
    }

    return (
        <div className="result-container">
            <div className="card result-card">
                <h1 className="result-title">Challenge completed</h1>

                <div className="badges">
                    <span className="badge badge-level">Level {result.level}</span>
                    <span className="badge badge-score">Score {result.score}</span>
                </div>

                <div className="feedback-section">
                    <div className="feedback-block user-input">
                        <strong>Your sentence:</strong> <span className="underline">{originalSentence}</span>
                    </div>

                    <div className="feedback-block suggestion-block">
                        <div className="suggestion-text">
                            <strong>Suggestion:</strong> <span className="underline">{result.corrected_sentence}</span>
                        </div>
                        <p className="suggestion-detail">
                            {result.suggestion}
                        </p>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn-secondary" onClick={() => navigate('/')}>Close</button>
                    <button className="btn-primary" onClick={() => navigate('/dashboard')}>View my progress</button>
                </div>
            </div>
        </div>
    );
};

export default ChallengeResult;
