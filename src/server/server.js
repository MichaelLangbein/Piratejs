// https://stackoverflow.com/questions/15601703/difference-between-app-use-and-app-get-in-express-js 
// https://stackoverflow.com/questions/35799699/what-is-the-rule-for-express-static-root-path


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var engine = require('./serverEngine.js');



app.get('/', function(req, res) {
	res.sendFile(__dirname + '/../../build/index.html');
});

http.listen(3000, function () {
	console.log('listening on port 3000');
});

io.on('connection', function(socket) {
	console.log("Socket received connection");
	engine.onConnection(io, socket);

	socket.on("keyPressed", function(data) {
		engine.onKeyPressed(io, socket, data);
	});

	socket.on("disconnect", function() {
		console.log("Socket received disconnect event");
		engine.onDisconnect(io, socket);
	});
});

var gameLoop = function () {
	engine.update();
	io.emit('stateUpdate', engine.agents);
};

setInterval(gameLoop, 60);
