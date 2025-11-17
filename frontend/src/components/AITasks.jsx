import React, { useState, useEffect } from 'react';
import '../App.css'; 

const API_URL = 'http://localhost:5000/api/tasks';

export default function AITasks({ user }) {
    const [task, setTask] = useState(null);
    const [proofUrl, setProofUrl] = useState('');
    const [submittedProofs, setSubmittedProofs] = useState([]); 
    const [message, setMessage] = useState('');
    const isTaskCompleted = submittedProofs.some(proof => 
        proof.taskId === task?._id && proof.userId === user._id
    );

    
    useEffect(() => {
        const fetchTaskAndStatus = async () => {
            try {
                
                const taskResponse = await fetch(`${API_URL}/today`);
                const taskData = await taskResponse.json();
                
                if (taskData._id) {
                    setTask(taskData);
                    
                   
                }
            } catch (error) {
                console.error("Error fetching task:", error);
                setMessage("Could not load daily task.");
            }
        };
        fetchTaskAndStatus();
    }, []);

    
    const handleSubmitProof = async (e) => {
        e.preventDefault();
        setMessage('');

        if (isTaskCompleted) {
            setMessage("You have already submitted this task!");
            return;
        }

        
        const mockPhotoUrl = proofUrl.trim() || `https://via.placeholder.com/300?text=Proof+by+${user.name}`;

        const submissionData = {
            userId: user._id,
            taskId: task._id,
            photoUrl: mockPhotoUrl
        };

        try {
            const response = await fetch(`${API_URL}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.msg); 
                setSubmittedProofs([...submittedProofs, { taskId: task._id, userId: user._id, photoUrl: mockPhotoUrl }]);
                setProofUrl(mockPhotoUrl);
            } else {
                setMessage(data.msg || 'Submission failed.');
            }
        } catch (error) {
            console.error("Error submitting proof:", error);
            setMessage("Failed to connect to server for submission.");
        }
    };

    if (!task) {
        return <div className="ai-tasks card dark-card"><h3>🤖 AI Coach Tasks</h3><p>Loading task...</p></div>;
    }
    
    
    const completed = isTaskCompleted;

    return (
        <div className="ai-tasks card dark-card">
            <h3>🤖 AI Coach Daily Task (Points: {task.maxPoints})</h3>
            
            <div className='task-details'>
                <p className="task-description">{task.description}</p>
                <p className="task-category">Category: {task.category}</p>
            </div>

            {completed ? (
                <div className="task-submitted-message">
                    <p>✅ **TASK COMPLETE!**</p>
                    <p className='message-success'>{message || `You earned ${task.maxPoints} points!`}</p>
                    <img src={proofUrl || `https://via.placeholder.com/300?text=Proof+by+${user.name}`} alt="Submitted Proof" style={{maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px'}}/>
                </div>
            ) : (
                <form onSubmit={handleSubmitProof} className='proof-form'>
                    <p>Upload Photo Proof (Paste Mock URL):</p>
                    <input
                        type="text"
                        placeholder="e.g., photo URL or link"
                        value={proofUrl}
                        onChange={(e) => setProofUrl(e.target.value)}
                
                    />
                    {message && <p className="error-text">{message}</p>}
                    <button type="submit" className="btn-gradient">
                        Submit Proof & Claim {task.maxPoints} Points
                    </button>
                    <p className="small-text" style={{marginTop: '10px', color: '#ccc'}}>*If no URL is provided, a mock photo will be used.</p>
                </form>
            )}
        </div>
    );
}