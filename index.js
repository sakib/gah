var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../chat-app', 'index.html'));
});
 
var usrs = {};
// Register events on socket connection
io.on('connection', function(socket){ 

  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
  socket.on('joinNotice', function(usr){
    usrs[usr] = true;
    io.emit('chatMessage', 'System', '<em>' + usr + ' has joined chat.</em>');
    io.emit('joinNotice', usr, JSON.stringify(usrs));
  });
  socket.on('goodBye', function(usr){
    delete usrs[usr];
    io.emit('chatMessage', 'System', '<em>' + usr + ' has left.</em>');
    io.emit('joinNotice', usr, JSON.stringify(usrs));
  });
});
 
// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
