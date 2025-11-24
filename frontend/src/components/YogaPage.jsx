import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const yogaRoutines = [
    { 
        id: "morning",
        title: "☀️ Morning Energy Flow", 
        duration: "20 min",
        focus: "Wake up the spine and build heat.",
        poses: ["Sun Salutations A & B", "Warrior I & II", "Tree Pose"],
        color: '#ffc107',
    },
    { 
        id: "sleep",
        title: "🌙 Deep Sleep Relaxation", 
        duration: "30 min",
        focus: "Calm the nervous system and release tension.",
        poses: ["Child's Pose", "Legs Up the Wall", "Supine Twist", "Savasana"],
        color: '#673ab7',
    },
    { 
        id: "stretch",
        title: "💪 Post-Workout Stretch", 
        duration: "15 min",
        focus: "Target tight hips and hamstrings after exercise.",
        poses: ["Pigeon Pose", "Reclined Hand-to-Big-Toe Pose", "Lizard Pose"],
        color: '#4caf50',
    },
];


const YogaPage = () => {
  const navigate = useNavigate();
  return (
    <div className="content-page padded-section light-bg">
      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
      <h2 className="text-gradient">🧘 Yoga & Mindfulness Routines</h2>
      <p className="subtitle">
        Find balance, improve flexibility, and enhance recovery with these curated flows.
      </p>

      <div className="yoga-cards-grid">
        {yogaRoutines.map((routine, index) => (
          <div key={index} className="card dark-card" style={{ borderTop: `5px solid ${routine.color}` }}>
            <h3 style={{ color: routine.color }}>{routine.title}</h3>
            <p><strong>🕒 Duration:</strong> {routine.duration}</p>
            <p><strong>🎯 Focus:</strong> {routine.focus}</p>
            <p><strong>Key Poses:</strong></p>
            <ul>
              {routine.poses.map((pose, pIndex) => (
                <li key={pIndex}>{pose}</li>
              ))}
            </ul>
            <button className="btn-gradient small-btn"  onClick={() => navigate(`/yoga/flow/${index}`)} style={{ marginTop: '10px' }}>Start Flow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YogaPage;