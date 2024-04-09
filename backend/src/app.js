const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});     
io.on('connection', (socket) => {
    socket.on('edit', (content) => {
        console.log({content})
        io.emit('updateContent', content);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 5001;
server.listen(PORT, () => console.log(`The Server is running at Port: ${PORT}`));
