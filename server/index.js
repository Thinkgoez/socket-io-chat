const express = require('express');
const app = express();
const server = require('http').createServer(app);

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});
const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Chatroom

let numUsers = 0;

io.on('connection', (socket) => {
    console.log('connected');
    let addedUser = false;
    // when the client emits 'new message', this listens and executes

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        if (!data.trim()) return;
        let messageData = {
            username: socket.username,
            message: data
        }
        socket.broadcast.emit('new message', messageData)
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', (reason) => {
        console.log('disconnect, reason:', reason);
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});