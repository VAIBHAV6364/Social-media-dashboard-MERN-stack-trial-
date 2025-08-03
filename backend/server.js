const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/chat', require('./routes/chat'));

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Socket.IO
io.on('connection', socket => {
    console.log('New socket connected:', socket.id);
    
    socket.on('joinRoom', room => socket.join(room));

    socket.on('sendMessage', ({ room, message }) => {
        io.to(room).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => console.log('User disconnected'));
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
