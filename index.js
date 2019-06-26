var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/SamplePreChatFormV2.html');
});

var total_users = 0;

io.on('connection', function(socket) {

    total_users++;
    io.emit('user connected', total_users);

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        total_users--;
        io.emit('user disconnected', total_users);
    });
});

http.listen((process.env.PORT || 3000), function() {
});
