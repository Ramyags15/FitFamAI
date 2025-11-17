
import React from 'react';

export default function Dashboard({ user, onLogout }) {
  if (!user) return <div className="padded-section">Loading...</div>;
  
  return (
    <div className="padded-section" style={{ textAlign: 'left' }}>
      <h2>Welcome back, {user.name.split(' ')[0]}!</h2>
      <p>This is your AI Chat & Challenge Dashboard.</p>
      
     
      <div style={{ height: '500px', border: '1px solid #444', padding: '20px', backgroundColor: '#2d2d2d' }}>
        <h3>Group Chat / AI Feed</h3>
        <p>Chat system coming soon...</p>
      </div>
      
      <button onClick={onLogout} style={{ marginTop: '20px' }} className="btn-gradient">Log Out</button>
    </div>
  );
}