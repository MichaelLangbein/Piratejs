var Ball = function(posX, posY, angle) {
	
	this.type = "Ball";
	this.id = Math.random() * 1000;
	this.angle = angle;
	this.posX = posX;
	this.posY = posY;
	this.vel = 30;
	this.ttl = 100;
	this.colR = 100;
	this.colG = 100;
	this.colB = 100;

	this.update = function () {
		this.move();
		this.updateTtl();
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

	this.updateTtl = function () {
		if (this.ttl > 0) this.ttl -= 1;
	};
};

module.exports = Ball;
