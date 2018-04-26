var Ship = require('../server/Ship.js');
var NN = require('./nn.js');


var Eyes = function (engine) {
	
	this.engine = engine;

	this.findNearestEnemy = function () {
		var agents = this.engine.agents;
		for(var i = 0; i < agents.length; i++) {
			var agent = agents[i];
			if(agent.type == "Ship" && agent.id != this.id) {
				return agent;
			}
		}
		return agents[0];
	};
};

var AiShip = function (engine) {

	this.id = Math.random() * 1000;

	this.eyes = new Eyes(engine);

	this.brain = new NN([8, 10, 10, 4]);

	this.update = function () {
		var result = this.think();
		this.takeAction(result);
		this.move();
		this.updateCooldown();
	};

	this.think = function () {
		var ne = this.eyes.findNearestEnemy();
		var results = this.brain.evaluate([this.posX, this.posY, this.angle, this.speed, ne.posX, ne.posY, ne.angle, ne.speed]);
		return results.indexOf( Math.max.apply(Math, results) );
	};

	this.takeAction = function (result) {
		switch (result) {
			case 0: 
				this.angle += 1;
				break;
			case 1:
				this.angle -= 1;
				break;
			case 2: 
				this.shoot("starboard");
				break;
			case 3: 
				this.shoot("larboard");
				break;	
		}
	};

};

AiShip.prototype = Object.create(Ship.prototype);


module.exports = AiShip;
