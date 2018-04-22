var p5 = require('p5');
var socket = require('socket.io-client')('10.112.70.159:3000');
var engine = require('./clientEngine.js');



socket.on("stateUpdate", function(agents) {
	engine.updateAgents(agents);
});

var sketch = function(p) {
	p.angleMode(p.DEGREES);

	p.setup = function () {
		p.createCanvas(400, 400);
		p.background(0);
	};

	p.draw = function () {
		engine.draw(p);
	};

	p.keyPressed = function () {
		console.log("Now emitting keyPressed: " + p.keyCode);
		socket.emit("keyPressed", {keyCode: p.keyCode});
	};
};

new p5(sketch, 'processingCanvas');
