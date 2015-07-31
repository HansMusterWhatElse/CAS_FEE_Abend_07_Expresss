var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  var i = this;
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  // User disconnected
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// http://socket.io/docs/server-api/

// // the following two will emit to all the sockets connected to `/`
// io.sockets.emit('hi', 'everyone');
// io.emit('hi', 'everyone'); // short form