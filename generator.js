/*
* Define line graph 
*/
function generator(){
	// Default settings
	var days = 8;
	var growth = 70;
	var amplitude = 50;
	var intervals = 96;	// Intervals per wave (96/day to imitate utilization)
	var bounds = {upper: 100, lower: 5};
	
	var frequency = 2 * Math.PI / intervals;
	var median = 5;
	var variance = 5;
	var noise = d3.random.normal(median, variance);

	var object = {};

	object.calculate = function(){
		var data = [];
		var increase = Math.PI * 2 / 96;
		var increment = 0;
		var counter = 0;

		for ( i = 0; i < days; i += 0.01 ) {
			// var point = (Math.sin( counter ) / 2 + 0.5) * (base + (growth/days * Math.round(i))) + noise();
			var point = (amplitude + (growth / days * Math.round(i))) * (Math.sin(counter) / 2 + .5) + noise();

			if(point > bounds.upper){
		  	point = bounds.upper;
			}else if(point < bounds.lower){
		  	point = bounds.lower;
		  }

		  data.push({
		  	x: increment,
		  	y: parseFloat(point.toFixed(2))
		  });
		  counter += increase;
		  increment++;
		};
		return data;
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
			amplitude: this.amplitude(),
			growth: this.growth(),
			days: this.days(),
			bands: {
				Low: false,
				Medium: false,
				High: false,
				Critical: false
			}
		};

		var tempData = [];
		data.forEach(function(d){
			if (d.y > stats.max) stats.max = d.y;
    	if (d.y < stats.min) stats.min = d.y;
			tempData.push(d.y); 
		});
		tempData.sort(d3.ascending);
		stats.quartile = {
			lower: parseFloat(d3.quantile(tempData, .25).toFixed(2)),
			upper: parseFloat(d3.quantile(tempData, .75).toFixed(2))
		};
		stats.mean = parseFloat(d3.mean(tempData).toFixed(2));
		stats.deviation = parseFloat(d3.deviation(tempData).toFixed(2));
		stats.variance = parseFloat(d3.variance(tempData).toFixed(2));
		var bands = this.bands();
		bands.forEach(function(d){
			stats.bands[d.name] = d.value;
		});

		return stats;
	};

	object.bands = function(){
		var bands = d3.scale.threshold()
			.domain([50, 70, 90])
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
					summary[j].value++
				}
			}
		}
		return summary;
	};

  object.days = function(value){
    if (!arguments.length) return days;
    days = value;
    return object;
  };

  object.growth = function(value){
    if (!arguments.length) return growth;
    growth = value;
    return object;
  };

  object.amplitude = function(value){
    if (!arguments.length) return amplitude;
    amplitude = value;
    return object;
  };

  object.bounds = function(value){
    if (!arguments.length) return bounds;
    bounds = value;
    return object;
  };

  object.median = function(value){
    if (!arguments.length) return median;
    median = value;
    return object;
  };

  object.variance = function(value){
    if (!arguments.length) return variance;
    variance = value;
    return object;
  };

	return object;
};