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
		if(agent.posX > 400) {
			agent.posX -= 400;
		}
		if(agent.posY > 400) {
			agent.posY -= 400;
		}
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

	onKeyPressed: function (io, socket, data) {
		var id = socket.id;
		var agent = this.findAgentWithId(id);
		agent.handleKeyPress(data);
	},

	findAgentWithId: function (id) {
		return this.agents.find(function(agent){
			return agent.id = id;
		});
	}
};

module.exports = serverEngine;
