import React from 'react';
import { Link } from 'react-router-dom';

const gamesList = [
    { title: "FitFam Bingo", description: "Complete a row of fitness tasks (e.g., 50 Pushups, 1 hour cardio, 5 servings veggies) for a chance to earn bonus points!", status: "Coming Soon" },
    { title: "AI Trainer Battle", description: "Challenge your AI coach's personalized workout predictions for your body type. Beat its forecast to win a badge!", status: "In Design" },
    { title: "Daily Step Challenge", description: "Compete with users globally for the highest step count today. Points and virtual badges await the top 10!", status: "Live Beta" },
];

const GamePage = () => {
    return (
        <div className="content-page padded-section dark-bg">
            <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
            <h2 className="text-gradient">🕹️ Game & Fun Zone</h2>
            <p className="subtitle">
                Make fitness a competition! Here, you can find fun challenges to earn extra points, badges, and compete with the FitFam community.
            </p>

            <div className="yoga-cards-grid">
                {gamesList.map((game, index) => (
                    <div key={index} className="card light-card" style={{ borderTop: `5px solid ${index % 3 === 0 ? '#ffc107' : index % 3 === 1 ? '#e91e63' : '#4caf50'}`, color: '#1a1a2e' }}>
                        <h3>{game.title}</h3>
                        <p>{game.description}</p>
                        <span className="status-tag" style={{ 
                            backgroundColor: game.status === 'Live Beta' ? '#4caf50' : '#ffc107', 
                            color: '#fff', 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '0.9em',
                            display: 'inline-block',
                            marginTop: '10px'
                        }}>
                            {game.status}
                        </span>
                    </div>
                ))}
            </div>
            
            <div className="routine-notes" style={{ marginTop: '50px', backgroundColor: '#3e4a59', color: '#fff' }}>
                <h3 style={{ color: '#ffc107' }}>Note on Points</h3>
                <p>Points earned in the Game Zone are added directly to your profile and contribute to your Leaderboard ranking!</p>
            </div>
        </div>
    );
};

export default GamePage;