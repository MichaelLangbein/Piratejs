var p5 = require('p5');
var socket = require('socket.io-client')('10.112.70.159:3000');
var engine = require('./clientEngine.js');



socket.on("receivedNewPlayer", function(agents) {
	console.log("Adding new player");
	engine.updateAgents(agents);
});

socket.on("receivedButtonPressed", function (agents) {
	console.log("Reacting on button press");
	engine.updateAgents(agents);
});


var sketch = function(p) {
	p.setup = function () {
		p.createCanvas(400, 400);
		p.background(0);
	};

	p.draw = function () {
		engine.update();
		engine.draw(p);
	};
};

new p5(sketch, 'processingCanvas');
