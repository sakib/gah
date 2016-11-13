var url = "https://api.projectoxford.ai/vision/v1.0/describe?maxCandidates=1";
var method = "POST";
var async = true;

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
 
socket.on('joinNotice', function(user, message){
    if(message == undefined) return;
    var me = $('#user').val();
    var usrs = JSON.parse(message);
    $('#players-container').empty();
    for(var usr in usrs){
        if(usr.length <= 0 || usr == me) continue;
        var $outer = $('<div>');
        var $inner = $('<div>');
        $inner.text(usr);
        $outer.addClass('col-md-1');
        $outer.addClass('player');
        $outer.append($inner);
        $('#players-container').append($outer);
    }
});

$(document).ready(function(){
  $(window).on('unload', function(){
    socket.emit('goodBye', $('#user').val());
  });

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

        var request = new XMLHttpRequest();
        request.open(method, url, async);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Ocp-Apim-Subscription-Key", "f65844446d6b4116b20a69c99fd652d4");
        request.onload = function() {
          $img.attr('title', JSON.parse(request.responseText).description.captions[0].text);
        }
        request.send("{'url':'" + data.data.image_url + "'}");
        
        $temp.append($img);
        $('#gifs').append($temp);
      });
  }

  socket.emit('joinNotice', name);
});
 
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
