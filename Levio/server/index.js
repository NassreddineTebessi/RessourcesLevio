let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
io.set('origins', '*:*');
users = [];
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

  socket.on('new-user', function(data) {
    console.log(data);
    socket.user= data;
    users.push(data);
    io.emit('users', users);
  });
  socket.on('new-message', (message) => {
    io.emit('new-message',message);
  });
  socket.on('disconnect', function(data) {
    console.log('disconnected');
    users.splice(users.indexOf(socket.user), 1);
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});

