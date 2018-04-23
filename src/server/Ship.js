var Ship = function (id) {
	this.type = "Ship";
	this.id = id;
	this.posX = 400;//Math.random() * 800;
	this.posY = 300;//Math.random() * 600;
	this.angle = 0; //Math.random() * 360;
	this.gunCooldown = 10;
	this.vel = Math.random() * 10;
	this.colR = Math.random() * 255;
	this.colG = Math.random() * 255;
	this.colB = Math.random() * 255;
};

module.exports = Ship;
