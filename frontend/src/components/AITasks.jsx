import React, { useState, useEffect } from 'react';
import '../App.css'; 

const API_URL = 'http://localhost:5000/api/tasks';

export default function AITasks({ user }) {
    const [task, setTask] = useState(null);
    const [proofUrl, setProofUrl] = useState('');
    // Use submitted proofs array to check if a user completed the task 
    const [submittedProofs, setSubmittedProofs] = useState([]); 
    const [message, setMessage] = useState('');

    // State to determine if the task has been submitted by the current user
    const isTaskCompleted = submittedProofs.some(proof => 
        proof.taskId === task?._id && proof.userId === user._id
    );

    // 1. Fetch Today's Task and User's Submission Status
    useEffect(() => {
        const fetchTaskAndStatus = async () => {
            try {
                // Fetch today's task
                const taskResponse = await fetch(`${API_URL}/today`);
                const taskData = await taskResponse.json();
                
                if (taskData._id) {
                    setTask(taskData);
                    
                    // In a real app, you would fetch only the current user's proof.
                    // For simplicity, we assume we can fetch all proofs to check status.
                    // (We'll skip fetching all proofs to maintain the prototype's speed and focus.)
                    // Instead, we rely on the `isSubmitted` state after a successful POST.
                }
            } catch (error) {
                console.error("Error fetching task:", error);
                setMessage("Could not load daily task.");
            }
        };
        fetchTaskAndStatus();
    }, []);

    // 2. Handle Proof Submission
    const handleSubmitProof = async (e) => {
        e.preventDefault();
        setMessage('');

        if (isTaskCompleted) {
            setMessage("You have already submitted this task!");
            return;
        }

        // Mock URL if user leaves it empty (since we aren't doing real file uploads)
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
                setMessage(data.msg); // Success message from backend
                // Add the newly submitted proof to the list (or just mark as complete)
                setSubmittedProofs([...submittedProofs, { taskId: task._id, userId: user._id, photoUrl: mockPhotoUrl }]);
                setProofUrl(mockPhotoUrl);
                // The backend automatically updated user points!
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
    
    // Check completion status based on submittedProofs array
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
                        // Removed 'required' since we provide a mock default
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