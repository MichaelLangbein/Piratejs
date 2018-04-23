var Ship = require('./Ship.js');


var serverEngine = {
	agents: [],

	update: function () {
		for(var i = 0; i < this.agents.length; i++){
			var agent = this.agents[i];
			agent.update();	
		}
		this.agents = this.filter(this.agents);	
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
				var ball = ship.shoot("starboard");
				if(ball) this.agents.push(ball);
				break;
			case "DOWN_ARROW": 
				var ball = ship.shoot("larboard");
				if(ball) this.agents.push(ball);
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
