const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
// const server = require('http').createServer(app)
// const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
// const cors = require('cors');

// let usersOnline = [];

// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('./routes/auth'))
app.use('/post', require('./routes/post'))
app.use('/profile', require('./routes/profile'))

// BRAD GITHUB CHATCORD
// io.on("connection", socket => {
//     socket.on('user online', username => {
//         usersOnline.push({ username, id: socket.id })
//         const usersnames = usersOnline.map(user => user.username)

//         io.emit('update users', usersnames)
//     })

//     socket.on('new message', message => {
//         io.emit('update chat', message)
//     })

//     socket.on('user disconnected', username => {
//         usersOnline = usersOnline.filter(user => user.username !== username)
//         const usersnames = usersOnline.map(user => user.username)

//         io.emit('update users', usersnames)
//     })

//     socket.on('disconnect', client => {
//         const srvSockets = io.sockets.sockets;
//         const onlineLeft = Object.keys(srvSockets);

//         usersOnline = usersOnline.filter(user => onlineLeft.includes(user.id))
//     })
// });

const PORT = process.env.PORT || 4000

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('connected to MongoDB')
        // server.listen(PORT, () => console.log(`server is up on PORT: ${PORT}`));
        app.listen(PORT, () => console.log(`server is up on PORT: ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()


