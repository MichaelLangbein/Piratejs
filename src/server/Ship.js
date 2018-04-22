var Ship = function (id) {
	this.id = id;
	this.posX = Math.random() * 400;
	this.posY = Math.random() * 400;
	this.velX = Math.random() * 10;
	this.velY = Math.random() * 10;
};

module.exports = Ship;
