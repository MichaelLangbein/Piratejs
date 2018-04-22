var Ship = function (id) {
	this.id = id;
	this.posX = Math.random() * 800;
	this.posY = Math.random() * 600;
	this.angle = Math.random() * 360;
	this.vel = Math.random() * 10;
	this.colR = Math.random() * 255;
	this.colG = Math.random() * 255;
	this.colB = Math.random() * 255;
	
	this.handleKeyPress = function (data) {
		switch (data.keyCode) {
			case "LEFT_ARROW":
				this.angle += 1;
				break;
			case "RIGHT_ARROW": 
				this.angle -= 1;
				break;
			default:
				break;
		}
	};
};

module.exports = Ship;
