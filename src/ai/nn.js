var neuron = function () {
	this.evaluate = function (input) {
		return 1.0 / (1.0 + Math.exp(-input));
	};
};

var nn = function (shape) {
	
	this.weights = [];
	this.layers = [];
	
	// weights: between 0 and 1, 1 and 2, ...
	for(var l = 1; l < shape.length; l++) {
		var count0 = shape[l-1];
		var count1 = shape[l];
		var weight = [];
		for(var c0 = 0; c0 < count0; c0++) {
			weight.push([]);
			for(var c1 = 0; c1 < count1; c1++){
				weight[c0].push(Math.random());
			}
		}
		this.weights.push(weight);
	}

	// layers: none on level 0.
	for(var l = 1; l < shape.length; l++) {
		var count = shape[l];
		var layer = [];
		for(var n = 0; n < count; n++) {
			layer.push(new neuron());
		}
		this.layers.push(layer);
	}

	this.evaluate = function (input) {
		for(var l = 0; l < this.layers.length - 1; l++) {
			var weighted = this.transmitThroughWeights(input, this.weights[l]);
			var output = this.evaluateOnNeurons(weighted, this.layers[l]);
			input = output;
		}
		return output;
	};

	this.evaluateOnNeurons = function (input, neurons) {
		var output = [];
		for(var i = 0; i < input.length; i++){
			var result = neurons[i].evaluate(input[i]);
			output.push(result);
		}
		return output;
	};

	this.transmitThroughWeights = function (input, weights) {
		var output = [];
		for(var r = 0; r < input.length; r++){
			var sum = 0;
			for(var c = 0; c < weights[r].length; c++){
				sum += input[c] * weights[r][c];
			}
			output.push(sum);
		}
		return output;
	};
};

module.exports = nn;
