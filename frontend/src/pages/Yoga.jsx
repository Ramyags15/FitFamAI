// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import api from '../api';

export default function Profile(){
  const [user,setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(()=> {
    if (!userId) return;
    api.get(`/users/profile/${userId}`).then(res => setUser(res.data)).catch(()=>{});
  }, []);

  if (!userId) return <div>Please login first.</div>;
  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Points:</b> {user.points ?? 0}</p>
          <p><b>Badges:</b> {(user.badges || []).join(', ')}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}
