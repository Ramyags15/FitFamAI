import React, { useState, useEffect } from 'react';
import '../App.css'; 

const API_URL = 'http://localhost:5000/api/tasks';

export default function Leaderboard() {
    const [rankings, setRankings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchLeaderboard = async () => {
        try {
            const response = await fetch(`${API_URL}/leaderboard`);
            const data = await response.json();
            setRankings(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 30000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="leaderboard card dark-card">
            <h3>🏆 Top FitFam Competitors</h3>
            {rankings.length > 0 && (
            <div className="weekly-champion-banner">
                <p>🏅 Current Weekly Champion (Highest Points):</p>
                <h4>{rankings[0].name} with {rankings[0].points} Pts!</h4>
            </div>
        )}
            {isLoading ? (
                <p>Loading rankings...</p>
            ) : (
                <ol className="ranking-list">
                    {rankings.map((user, index) => (
                        <li key={user._id} className="ranking-item">
                            <span className={`rank-number rank-${index + 1}`}>#{index + 1}</span>
                            <span className="rank-name">{user.name}</span>
                            <span className="rank-points">{user.points} Pts</span>
                        </li>
                    ))}
                    {rankings.length === 0 && <p>No users on the leaderboard yet. Sign up and submit a task!</p>}
                </ol>
            )}
            <button className='btn-gradient refresh-btn' onClick={fetchLeaderboard}>Refresh</button>
        </div>
    );
}