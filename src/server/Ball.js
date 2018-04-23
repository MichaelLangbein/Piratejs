var Ball = function(ship, direction) {
	var dir = (direction == "starboard" ? 1 : -1);
	this.type = "Ball";
	this.id = Math.random() * 1000;
	this.angle = ship.angle + 90.0 * dir;
	this.posX = ship.posX + Math.sin(this.angle) * 20 * dir;
	this.posY = ship.posY - Math.cos(this.angle) * 20 * dir;
	this.vel = Math.random() * 100;
	this.ttl = 100;
	this.colR = 100;
	this.colG = 100;
	this.colB = 100;
};

module.exports = Ball;
