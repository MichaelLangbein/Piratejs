var Ball = require('./Ball.js');


var Ship = function (id) {
	
	this.type = "Ship";
	this.id = id;
	this.posX = Math.random() * 800;
	this.posY = Math.random() * 600;
	this.angle = Math.random() * 360;
	this.gunCooldown = 10;
	this.vel = 5;
	this.colR = Math.random() * 255;
	this.colG = Math.random() * 255;
	this.colB = Math.random() * 255;

	this.update = function () {
		this.move();
		this.updateCooldown();
	};

	this.move = function () {
		this.posX += Math.sin(this.angle * 2.0 * Math.PI / 360.0) * this.vel;
		this.posY -= Math.cos(this.angle * 2.0 * Math.PI / 360.0) * this.vel;
		if(this.posX > 800) {
			this.posX -= 800;
		} else if (this.posX < 0) {
			this.posX += 800;
		}
		if(this.posY > 600) {
			this.posY -= 600;
		} else if (this.posY < 0) {
			this.posY += 600;
		}
	};

	this.updateCooldown = function () {
		if (this.gunCooldown > 0) this.gunCooldown -= 1;		
	};

	this.canShoot = function () {
		return this.gunCooldown <= 0;
	};

	this.shoot = function (direction) {
		if (this.canShoot()){
			var dir = (direction == "starboard" ? 1 : -1);
			var ballAngle = this.angle + 90.0 * dir;
			var ballX = this.posX + Math.sin(ballAngle) * 20 * dir;
			var ballY = this.posY - Math.cos(ballAngle) * 20 * dir;
			var ball = new Ball(ballX, ballY, ballAngle);
			return ball;
		}
		return false;
	};
};

module.exports = Ship;
