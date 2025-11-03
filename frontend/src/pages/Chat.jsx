// src/pages/Chat.jsx
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');

export default function Chat(){
  const [room,setRoom] = useState('general');
  const [msg,setMsg] = useState('');
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    socket.emit('joinRoom', room);
    socket.on('message', m => setMessages(prev => [...prev, m]));
    return () => socket.off('message');
  },[room]);

  const send = () => {
    socket.emit('message', { room, user: localStorage.getItem('userId') || 'Anon', text: msg, time: new Date() });
    setMsg('');
  };

  return (
    <div>
      <h2>Group Chat</h2>
      <input value={room} onChange={e=>setRoom(e.target.value)} />
      <div style={{height:200, overflow:'auto', border:'1px solid #ddd', margin:8, padding:8}}>
        {messages.map((m,i)=><div key={i}><b>{m.user}:</b> {m.text}</div>)}
      </div>
      <input value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
