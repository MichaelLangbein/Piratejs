var clientEngine = {
	agents: [],
	
	draw: function (p) {
		p.background(0);
		for(var i = 0; i < this.agents.length; i++){
			var agent = this.agents[i];
			this.drawAgent(p, agent);
		}		
	},

	drawAgent: function (p, agent) {
		p.push();
		p.translate(agent.posX, agent.posY);
		p.rotate(agent.angle + 315);
		p.fill(agent.colR, agent.colG, agent.colB);
		p.rectMode(p.CENTER);
		p.rect(0, 0, 30, 50);
		p.pop();	
	},

	updateAgents: function (agents) {
		this.agents = agents;
	}
};


module.exports = clientEngine;
