var socket = io(); 
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() { 
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<div class="row"><b style="color:' + color + '">' + from + '</b>: ' + msg + '</div>');
});
 
socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
 
$(document).ready(function(){
  var name = makeid();
  $('#messages').css({height: 450});
  $('#user').val(name);

  for(var i = 0; i < 6; i++){
    $.get(
            "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC",
            function(data){
                var $temp = $('<div class="gif-container col-md-1">');
                var $img = $('<img>');
                $img.attr('src', data.data.image_url);
                $temp.append($img);
                $('#gifs').append($temp);
            });
  }

  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});
 
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
