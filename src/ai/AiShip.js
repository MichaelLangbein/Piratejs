var Ship = require('../server/Ship.js');
var NN = require('./nn.js');


var Eyes = function (engine) {
	this.engine = engine;

	this.findNearestEnemy = function(){
		
	};
};

var AiShip = function (engine) {

	this.eyes = new Eyes(engine);

	this.brain = new NN([8, 10, 10, 4]);

	this.update = function () {
		this.think();
		this.move();
		this.updateCooldown();
	};

	this.think = function () {
		var nearestEnemy = this.eyes.findNearestEnemy();
		var result = this.brain.evaluate([this.posX, this.posY, this.angle, this.speed, ne.posX, ne.posY, ne.angle, ne.speed]);
		this.takeAction(result);
	};

	this.takeAction = function (result) {
		var max = this.indexOfMax(result);
		switch(max){
			case 0:
				this.angle +=1;
				break;
			case 1:
				this.angle -=1;
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
