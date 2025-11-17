
import { useState, useEffect } from 'react';
import api from '../api';

export default function Nutrition(){
  const [meal,setMeal] = useState('');
  const [calories,setCalories] = useState('');
  const [list,setList] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetch = async () => {
    if (!userId) return;
    const res = await api.get(`/nutrition/user/${userId}`);
    setList(res.data);
  };
  useEffect(()=>{ fetch(); }, []);

  const submit = async () => {
    if (!userId) return alert('Please login first');
    await api.post('/nutrition', { userId, meal, calories: Number(calories) });
    setMeal(''); setCalories('');
    fetch();
  };

  return (
    <div>
      <h2>Log Meal</h2>
      <input placeholder="Meal name" value={meal} onChange={e=>setMeal(e.target.value)} />
      <input placeholder="Calories" value={calories} onChange={e=>setCalories(e.target.value)} />
      <button onClick={submit}>Add Meal</button>

      <h3>Your Meals</h3>
      <ul>
        {list.map(n => <li key={n._id}>{n.meal} — {n.calories} cal — {new Date(n.date).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
