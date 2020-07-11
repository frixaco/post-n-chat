const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('./routes/auth'))
app.use('/post', require('./routes/post'))
app.use('/profile', require('./routes/profile'))

// const usersOnline = new Set()
let usersOnline = []

io.on('connection', socket => {
    socket.on('new_online_user', username => {
        console.log('new user:', username)

        let duplicate = false;
        for (let i = 0; i < usersOnline.length; i++) {
            if (usersOnline[i].username === username) {
                duplicate = true;
                break;
            }
        }
        if (duplicate) {
            console.log('updating socket id')
            usersOnline = usersOnline.map(user => {
                if (user.id !== socket.id && user.username === username) {
                    return { username, id: socket.id }
                }
            })
        } else {
            usersOnline.push({ username, id: socket.id })
        }

        io.emit('update_users_online', usersOnline.map(user => user.username))
    })

    socket.on('new_message', message => {
        io.emit('update_chat_history', message)
    })

    socket.on('user_disconnected', username => {
        usersOnline = usersOnline.filter(user => user.username !== username)
        io.emit('update_users_online', usersOnline.map(user => user.username))
    })

    socket.on('disconnect', () => {
        const srvSockets = io.sockets.sockets;
        const onlineLeft = Object.keys(srvSockets);

        usersOnline = usersOnline.filter(user => onlineLeft.includes(user.id))
        console.log('users left:', usersOnline)
        io.emit('update_users_online', usersOnline.map(user => user.username))
    })

    console.log('socket connected', socket.id)
})

const PORT = process.env.PORT || 4000

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('connected to MongoDB')
        server.listen(PORT, () => console.log(`server is up on PORT: ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()


