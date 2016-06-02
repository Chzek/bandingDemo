/*
* Define statistics to perform on data
*/
function Stats(){
	var days = 8;
	var bins = [60, 75, 90];
	var binThresholds = [300, 200, 100];
	var thresholds = [60, 75, 90];
	var data = [];

	var object = {
		days: days,
		bins: bins,
		binThresholds: binThresholds,
		thresholds: thresholds,
		data: data
	};

	object.bands = function(){
		var bands = d3.scale.threshold()
			.domain(bins)
			.range(['Low', 'Medium', 'High', 'Critical']);

		var summary = []; //{ Low: 0, Medium: 0, High: 0, Critical: 0 };
		// initialize summary
		summary.push({ name: "Low", value: 0 });
		summary.push({ name: "Medium", value: 0 });
		summary.push({ name: "High", value: 0 });
		summary.push({ name: "Critical", value: 0 });

		for(var i = 0; i < data.length; i++){
			var band = bands(data[i].y);
			for(var j = 0; j < summary.length; j++){
				if(band == summary[j].name){
					summary[j].value++;
				}
			}
		}
		return summary;
	};

	object.band = function(){
		var map = d3.map(this.bands(), function(d){ return d.name; });

		if(map.get('Critical').value >= 100/28*this.days()){
			return "Critical";
		}else if(map.get("Critical").value + map.get("High").value >= 200/28*this.days()){
			return "High";
		}else if(map.get("Critical").value + map.get("High").value + map.get("Medium").value >= 300/28*this.days()){
			return "Medium";
		}else{
			return "Low";
		}
	};

	object.stats = function(){
		// data = [{x: float, y: float},[],...]
		var stats = {
			min: Infinity,
			max: -Infinity,
			quartile: {
				lower: false,
				upper: false
			},
			mean: false,
			deviation: false,
			variance: false,
			days: this.days(),
			bands: {
				Low: false,
				Medium: false,
				High: false,
				Critical: false
			},
			band: false
		};

		var tempData = [];
		data.forEach(function(d){
			if (d.y > stats.max) stats.max = d.y;
    	if (d.y < stats.min) stats.min = d.y;
			tempData.push(d.y); 
		});
		tempData.sort(d3.ascending);
		stats.quartile = {
			lower: parseFloat(d3.quantile(tempData, 0.25).toFixed(2)),
			upper: parseFloat(d3.quantile(tempData, 0.75).toFixed(2))
		};
		stats.mean = parseFloat(d3.mean(tempData).toFixed(2));
		stats.deviation = parseFloat(d3.deviation(tempData).toFixed(2));
		stats.variance = parseFloat(d3.variance(tempData).toFixed(2));
		var bands = this.bands();
		bands.forEach(function(d){
			stats.bands[d.name] = d.value;
		});
		stats.band = this.band();

		return stats;
	};

	object.threshold = function(value){
		var t = d3.scale.threshold().domain(this.thresholds()).range(['Low','Medium','High','Critical']);
		return t(value);
	};

	object.percentile = function(value, days){
		var days = days * 96 | 96;
		var tempData = data.slice(data.length - days, data.length);
		var tempAry = [];
		for(var i = 0; i < tempData.length; i++){
			tempAry.push(tempData[i].y);
		}
		tempAry.sort(d3.ascending);
		return tempAry[Math.round(days * (value / 100))];
	};

	object.days = function(value){
    if (!arguments.length) return days;
    days = value;
    return object;
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

	object.data = function(value){
		if(!arguments.length) return data;
		if(Array.isArray(value)){
			value.forEach(function(d){
				if(typeof(d) !== "object") return "Element of array is not an object: "+d;
				if(!d.hasOwnProperty('x')) return "Object does not contain 'x'.";
				if(!d.hasOwnProperty('y')) return "Object does not contain 'y'.";
			});
		}else{
			return "Data is not an array!";
		}
		data = value;
		return object;
	};

	return object;
}