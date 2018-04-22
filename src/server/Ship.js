var Ship = function (id) {
	this.id = id;
	this.posX = Math.random() * 400;
	this.posY = Math.random() * 400;
	this.angle = Math.random() * 360;
	this.velX = Math.random() * 10;
	this.velY = Math.random() * 10;
	this.colR = Math.random() * 255;
	this.colG = Math.random() * 255;
	this.colB = Math.random() * 255;
	
	this.handleKeyPress = function (data) {
		switch (data.keyCode) {
			case 37: // LEFT_ARROW
				this.angle += 2;
				break;
			case 39: // RIGHT_ARROW: 
				this.angle -= 2;
				break;
			case 40: // DOWN_ARROW:
			case 38: // UP_ARROW:
				break;
			default:
				break;
		}
	};
};

module.exports = Ship;
