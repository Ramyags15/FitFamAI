require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/users');
const app = express();
const http = require('http'); // 1. Import HTTP module
const { Server } = require('socket.io');
const server = http.createServer(app);
const PROTOTYPE_ROOM = 'fitfam_group';
const taskRouter = require('./routes/tasks');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow connections from your React frontend
        methods: ["GET", "POST"]
    }
});
// 5. Handle Socket.io connections
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // *** 1. Make every new user automatically join the designated group room ***
    socket.join(PROTOTYPE_ROOM);
    console.log(`User ${socket.id} joined room: ${PROTOTYPE_ROOM}`);
    
    // Listen for incoming chat messages
    socket.on('sendMessage', (data) => {
        // *** 2. Change io.emit to io.to(ROOM).emit to send only to the room ***
        io.to(PROTOTYPE_ROOM).emit('receiveMessage', data);
        console.log(`Message received in ${PROTOTYPE_ROOM}: ${data.senderName} - ${data.message}`);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Fitness Prototype API is running'));

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/workouts', require('./routes/workouts'));
app.use('/api/nutrition', require('./routes/nutrition'));
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.get('/', (req,res) => res.send('Fitness Prototype API'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



