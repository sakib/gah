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
 
socket.on('judging', function(who, what){
    if(who != $('#user').val()){
        $('#botBut').children('input').prop('disabled', true);
    }
    $('#prompt').text(what);
});

socket.on('endJudge', function(who, what){
    $('.judge').removeClass('judge');
    if(who == "$$"){
        $('#botBut').children('input').prop('disabled', true);
        $('#start-round').prop('disabled', false);
    }else if(who != $('#user').val()){
        $('#user-' + who).addClass('judge');
    }else{
        $('#submissions').addClass('hidden');
        $('#gifs').removeClass('hidden');
        $('#botBut').children('input').prop('disabled', false);
        $('#start-round').prop('disabled', true);
    }
    $('#prompt').text(what);
});

socket.on('endSub', function(who, what){
    console.log("IFN " + what);
    if($('#botBut').children('input').filter(function(){$(this).prop('disabled')}).length == 3){
        console.log('Not j');
        socket.emit('endSub', $('#user').val(), $('.chosen-gif').first().children('img').first().attr('src'));
    }else if(what != undefined){
        console.log("j");
        var $temp = $('<div class="subs-container col-md-1">');
        var $img = $('<img>');
        $img.attr('src', what);
        $img.attr('data-who', who);
        $temp.append($img);
        $temp.click(function(){
            socket.emit('endJudge', $(this).children('img').first().attr('data-who'));
            
        })
        $('#submissions').append($temp);
        $('#gifs').addClass('hidden');
        $('#submissions').removeClass('hidden');
    }
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
    var ip = false;
    $(window).on('unload', function(){
        socket.emit('goodBye', $('#user').val());
    });

    $('#start-round').click(function(){
        ip = false;
        $(this).prop('disabled', true);
        $('#start-judging').prop('disabled', false);
        $('#reset-round').prop('disabled', false);
        socket.emit('judging', $('#user').val());
    });

    $('#start-judging').click(function(){
        // $(this).prop('disabled', true);
        $('#start-round').prop('disabled', true);
        $('#reset-round').prop('disabled', true);
        if(!ip){
            ip = true;
            socket.emit('endSub', $('#user').val());
        }
    });

    $('#reset-round').click(function(){
        ip = false;
        $(this).prop('disabled', true);
        $('#start-round').prop('disabled', false);
        $('#start-judging').prop('disabled', true);
        socket.emit('endJudge', '$$');
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
        request.onload = function() {
          $img.attr('title', JSON.parse(request.responseText).description.captions[0].text);
        }
        request.open(method, url, async);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Ocp-Apim-Subscription-Key", "f65844446d6b4116b20a69c99fd652d4");
        request.send("{'url':'" + data.data.image_url + "'}");
        
        $temp.append($img);
        $temp.click(function(){
            $('.chosen-gif').removeClass('chosen-gif');
            $(this).addClass('chosen-gif');
        });
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
