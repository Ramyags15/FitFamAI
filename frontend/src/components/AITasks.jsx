import React, { useState, useEffect } from 'react';
import '../App.css';
import LiveCapture from './LiveCapture';

const API_URL = 'http://localhost:5000/api/tasks';

export default function AITasks({ user }) {
  const [task, setTask] = useState(null);
  const [proofUrl, setProofUrl] = useState('');
  const [submittedProofs, setSubmittedProofs] = useState([]);
  const [message, setMessage] = useState('');

  const isTaskCompleted = submittedProofs.some(
    proof => proof.taskId === task?._id && proof.userId === user._id
  );

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskResponse = await fetch(`${API_URL}/today`);
        const taskData = await taskResponse.json();
        if (taskData._id) setTask(taskData);
      } catch (error) {
        console.error("Error fetching task:", error);
        setMessage("Could not load daily task.");
      }
    };
    fetchTask();
  }, []);

  // Called when LiveCapture sends photo
  const handleSubmitProof = async (dataUrl) => {
    if (isTaskCompleted) {
    alert("You have already submitted this task!");
    return; // stops duplicate submission
  }
    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          taskId: task._id,
          photoUrl: dataUrl
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.msg);
        setSubmittedProofs([...submittedProofs, { taskId: task._id, userId: user._id, photoUrl: dataUrl }]);
        setProofUrl(dataUrl);
      } else {
        setMessage(data.msg || 'Submission failed.');
      }
    } catch (error) {
      console.error("Error submitting proof:", error);
      setMessage("Failed to connect to server for submission.");
    }
  };

  if (!task) return <div className="ai-tasks card dark-card"><h3>🤖 AI Coach Tasks</h3><p>Loading task...</p></div>;

  return (
    <div className="ai-tasks card dark-card">
      <h3>🤖 AI Coach Daily Task (Points: {task.maxPoints})</h3>

      <div className='task-details'>
        <p className="task-description">{task.description}</p>
        <p className="task-category">Category: {task.category}</p>
      </div>

      {!isTaskCompleted ? (
        <>
          <LiveCapture onCapture={handleSubmitProof} />
          {proofUrl && (
            <div style={{ marginTop: '10px' }}>
              <h4>Captured Photo:</h4>
              <img src={proofUrl} alt="Proof" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }} />
            </div>
          )}
          {message && <p className="error-text">{message}</p>}
        </>
      ) : (
        <div>
          <h4>✅ Task Completed!</h4>
          <img src={proofUrl} alt="Proof" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }} />
          <p className='message-success'>{message || `You earned ${task.maxPoints} points!`}</p>
        </div>
      )}
    </div>
  );
}
