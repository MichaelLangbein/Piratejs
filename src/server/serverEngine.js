var Ship = require('./Ship.js');

var serverEngine = {
	agents: [],

	update: function () {
		for(var i = 0; i < this.agents.length; i++){
			var agent = this.agents[i];
			this.updateAgent(agent);
		}		
	},

	updateAgent: function (agent) {
		agent.posX += agent.velX;
		agent.posY += agent.velY;
	},


	onConnection: function (io, socket) {
		var id = socket.id;
		this.agents.push(new Ship(id));
		console.log("Added ship with id " + id);
	},

	onDisconnect: function (io, socket) {
		var id = socket.id;
		// todo: delete ship with this id.
	},

	onButtonPressed: function (io, socket) {},


};

module.exports = serverEngine;
