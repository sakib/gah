var app = require('express')();
var httpLib = require('http')
var http = httpLib.Server(app);
var io = require('socket.io')(http);
var path = require('path');
 

var getPrompt = function(cbk){
    var prompts = [
        "One Does Not Simply",
        "Ancient Aliens",
        "First World Problems",
        "Bad Luck Brian",
        "Condescending Wonka",
        "Do it live!",
        "Doge",
        "Faceplam",
        "Forever Alone",
        "Philoso-raptor",
        "Matrix Morpheaus",
        "Nothing to do here",
        "Overly attached girlfriend",
        "Scumbag Brain",
        "Shut up and Take my Money!",
        "The Rent is too Damn High!",
        "Ain't nobody got time for that!",
        "_____, ________ everywhere.",
    ];

    cbk(prompts[Math.floor(Math.random()*prompts.length)]);
}
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../chat-app', 'index.html'));
});
 
var usrs = {};
// Register events on socket connection
io.on('connection', function(socket){ 

    socket.on('endSub', function(who, what){
        console.log('es');
        if(what == undefined){
            io.emit('chatMessage', 'System', '<em>The judge has closed submissions!</em>');
            io.emit('endSub', who, what);
        }else{
            io.emit('endSub', who, what);
        }
    });

    socket.on('endJudge', function(who, what){
        if(who == "$$"){
            io.emit('chatMessage', 'System', '<em>The judge has decided to reset the round!</em>');
            io.emit('endJudge', who);
        }else{
            io.emit('chatMessage', 'System', '<em>' + who + ' has won! They shall be the next judge!</em>');
        }
        getPrompt(function(data){
            io.emit('endJudge', who, data);
        });
    });

    socket.on('judging', function(who, what){
        io.emit('chatMessage', 'System', '<em>It seems decided that ' + who + ' is the judge!</em>');
        getPrompt(function(p){
            io.emit('judging', who, p);
        });
    });

    socket.on('submit', function(from, m){
        io.emit('submit', from, m);
    })

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
