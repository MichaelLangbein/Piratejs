var Ship = require('./Ship.js');
var Ball = require('./Ball.js');

var serverEngine = {
	agents: [],

	update: function () {
		for(var i = 0; i < this.agents.length; i++){
			var agent = this.agents[i];
			this.moveAgent(agent);
			this.updateCounters(agent);
		}
		this.agents = this.filter(this.agents);	
	},

	moveAgent: function (agent) {
		agent.posX += Math.sin(agent.angle * 2.0 * Math.PI / 360.0) * agent.vel;
		agent.posY -= Math.cos(agent.angle * 2.0 * Math.PI / 360.0) * agent.vel;
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
	
	updateCounters: function (agent) {
		if (agent.type == "Ball") {
			if (agent.ttl > 0) agent.ttl -= 1;
		} else if (agent.type == "Ship") {
			if (agent.gunCooldown >= 0) agent.gunCooldown -= 1;
		}
	},

	filter: function (agents) {
		return agents.filter(function (agent) {
			if (agent.type == "Ball") {
				if (agent.ttl <= 0) {
					return false;
				}
			}
			return true;
		});
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
		var ship = this.findAgentWithId(id);
		switch (data.keyCode) {
			case "LEFT_ARROW":
				ship.angle -= 1;
				break;
			case "RIGHT_ARROW": 
				ship.angle += 1;
				break;
			case "UP_ARROW":
				if(ship.gunCooldown <= 0) {
					this.agents.push(new Ball(ship, "starboard"));
					ship.gunCooldown = 10;
				}
				break;
			case "DOWN_ARROW": 
				if(ship.gunCooldown <= 0) {
					this.agents.push(new Ball(ship, "larboard"));
					ship.gunCooldown = 10;
				}
				break;
			default:
				break;
		}

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
