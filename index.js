var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var port = process.env.PORT || 9001;

app.use(bodyParser.urlencoded({
  extended: true
}));


//Cors and Auth middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

io.on('connect', function(socket){
  console.log('connected');
  socket.on('broadcast', function(msg){
    io.emit('broadcast', msg.toString());
  });
  socket.on('dashboard'), function (signal){
    io.emit('dashboard', signal)
  }
});
app.post('/broadcast', function(request, response){
  let message = request.body.message
    io.emit('broadcast', message.toString());
  response.json({message: message, status: 'sent'});
});
http.listen(port, function(){
  console.log('listening on *:' + port);
});

