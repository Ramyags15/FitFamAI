import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../App.css'; // For styling

const socket = io('http://localhost:5000'); // Connect to the backend Socket.io server

export default function ChatBox({ user }) {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Connect and set up listeners
    useEffect(() => {
        // Listen for received messages
        socket.on('receiveMessage', (data) => {
            setChatLog((prevLog) => [...prevLog, data]);
        });
        
        // Cleanup on component unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Scroll every time the chatLog updates
    useEffect(() => {
        scrollToBottom();
    }, [chatLog]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const messageData = {
                senderId: user._id,
                senderName: user.name,
                message: message,
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            
            // Emit message to the server
            socket.emit('sendMessage', messageData);
            setMessage('');
        }
    };

    return (
        <div className="chat-box card dark-card">
            <h3>💬 FitFam Group Chat</h3>
            <div className="chat-messages-container">
                {chatLog.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message-bubble ${msg.senderId === user._id ? 'self' : 'other'}`}
                    >
                        <span className="sender-name">{msg.senderName}:</span>
                        <p className="message-text">{msg.message}</p>
                        <span className="message-time">{msg.time}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="chat-input-form">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                />
                <button type="submit" className="chat-send-btn">Send</button>
            </form>
        </div>
    );
}