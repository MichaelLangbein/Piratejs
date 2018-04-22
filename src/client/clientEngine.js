
var engine = {
	agents: [],
	
	update: function () {
		for(var i = 0; i < agents.length; i++){
			var agent = agents[i];
			this.updateAgent(agent);
		}		
	},

	updateAgent: function (agent) {
		agent.posX += agent.velX;
		agent.posY += agent.velY;
	},

	draw: function (p) {
		for(var i = 0; i < agents.length; i++){
			var agent = agents[i];
			this.drawAgent(p, agent);
		}		
	},

	drawAgent: function (p, agent) {
		p.push();
		p.translate(agent.posX, agent.posY);
		p.rotate(agent.velX, agent.velY);
		p.fill(agent.colR, agent.colG, agent.colB);
		p.rect(0, 0, 30, 50);
		p.pop();	
	},

	updateAgents: function (agents) {
		this.agents = agents;
	}
};


module.exports = engine;
