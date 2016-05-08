/*
* Define line graph 
*/
function stats(){
	var bins = [60, 75, 90];
	var binThresholds = [300, 200, 100];
	var thresholds = [60, 75, 90];

	var object = {
		bins: bins,
		binThresholds:  binThresholds,
		thresholds: thresholds,
	};

	object.bins = function(value){
		if(!arguments.length) return bins;
		bins = value;
		return object;
	};

	object.binThresholds = function(value){
		if(!arguments.length) return binThresholds;
		binThresholds = value;
		return object;
	};

	object.thresholds = function(value){
		if(!arguments.length) return thresholds;
		thresholds = value;
		return object;
	};
}