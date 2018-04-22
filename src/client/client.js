var p5 = require('p5');
var socket = require('socket.io-client')('10.112.70.159:3000');
var engine = require('./clientEngine.js');



socket.on("stateUpdate", function(agents) {
	engine.updateAgents(agents);
});

var sketch = function(p) {
	p.angleMode(p.DEGREES);

	p.setup = function () {
		p.createCanvas(800, 800);
		p.background(0);
	};

	p.draw = function () {
		if(p.keyIsDown(p.LEFT_ARROW)) {
			socket.emit("keyPressed", {keyCode: "LEFT_ARROW"});
		}else if (p.keyIsDown(p.RIGHT_ARROW)) {
			socket.emit("keyPressed", {keyCode: "RIGHT_ARROW"});
		}
		engine.draw(p);
	};

};

new p5(sketch, 'processingCanvas');
