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
		agent.posX += Math.sin(agent.angle * 2.0 * Math.PI / 360.0) * agent.vel;
		agent.posY += Math.cos(agent.angle * 2.0 * Math.PI / 360.0) * agent.vel * (-1);
		if(agent.posX > 800) {
			agent.posX -= 800;
		} else if (agent.posX < 0) {
			agent.posX += 800;
		}
		if(agent.posY > 600) {
			agent.posY -= 600;
		} else if (agent.posY < 0) {
			agent.posY += 600;
		}
	},


	onConnection: function (io, socket) {
		var id = socket.id;
		this.agents.push(new Ship(id));
		console.log("Added ship with id " + id);
	},

	onDisconnect: function (io, socket) {
		var id = socket.id;
		var index = this.findAgentIndexWithId(id);
		this.agents.splice(index, 1);
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
	}, 

	findAgentIndexWithId: function (id) {
		for (var i = 0; i < this.agents.length; i++) {
			if (this.agents[i].id == id) {
				return i;
			}
		}
	}
};

module.exports = serverEngine;
