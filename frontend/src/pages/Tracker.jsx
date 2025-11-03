// src/pages/Tracker.jsx
import { useState, useEffect } from 'react';
import api from '../api';

export default function Tracker(){
  const [type,setType] = useState('');
  const [duration,setDuration] = useState('');
  const [calories,setCalories] = useState('');
  const [list,setList] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchWorkouts = async () => {
    if (!userId) return;
    const res = await api.get(`/workouts/user/${userId}`);
    setList(res.data);
  };

  useEffect(()=>{ fetchWorkouts(); }, []);

  const submit = async () => {
    if (!userId) return alert('Please login first');
    await api.post('/workouts', {
      userId, type, durationMin: Number(duration), calories: Number(calories)
    });
    setType(''); setDuration(''); setCalories('');
    fetchWorkouts();
  };

  return (
    <div>
      <h2>Log Workout</h2>
      <input placeholder="Type (Run/Strength)" value={type} onChange={e=>setType(e.target.value)} />
      <input placeholder="Duration (min)" value={duration} onChange={e=>setDuration(e.target.value)} />
      <input placeholder="Calories" value={calories} onChange={e=>setCalories(e.target.value)} />
      <button onClick={submit}>Log</button>

      <h3>Your Workouts</h3>
      <ul>
        {list.map(w => <li key={w._id}>{w.type} — {w.durationMin} min — {w.calories} cal — {new Date(w.date).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
