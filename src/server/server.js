var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var engine = require('./serverEngine.js');


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
	console.log('listening on port 3000');
});

io.on('connection', function(socket) {
	engine.onConnection(io, socket);
});


var gameLoop = function () {
	engine.update();
	io.emit('stateUpdate', engine.agents);
};

setInterval(gameLoop, 100);
