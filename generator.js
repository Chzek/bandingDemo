/*
* Define line graph 
*/
function Generator(){
	// Default settings
	var days = 8;
	var growth = 70;
	var amplitude = 50;
	var intervals = 96;	// Intervals per wave (96/day to imitate utilization)
	var bounds = {upper: 100, lower: 5};
	var frequency = 2 * Math.PI / intervals;
	var median = 5;
	var variance = 5;
	var thresholds = [60, 75, 90];
	var noise = d3.random.normal(median, variance);

	var object = {
		days: days,
		growth: growth,
		amplitude: amplitude,
		intervals: intervals,
		bounds: bounds,
		frequency: frequency,
		median: median,
		variance: variance,
		thresholds: thresholds,
		noise: noise 
	};

	object.calculate = function(){
		var data = [];
		var increase = Math.PI * 2 / 96;
		var increment = 0;
		var counter = 0;

		for ( i = 0; i < days; i += 0.01 ) {
			// var point = (Math.sin( counter ) / 2 + 0.5) * (base + (growth/days * Math.round(i))) + noise();
			var point = (amplitude + (growth / days * Math.round(i))) * (Math.sin(counter) / 2 + 0.5) + noise();

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
		}
		return data;
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

  object.intervals = function(value){
  	if (!arguments.length) return intervals;
  	intervals = value;
  	return object;
  };

  object.bounds = function(value){
    if (!arguments.length) return bounds;
    bounds = value;
    return object;
  };

  object.frequency = function(value){
  	if (!arguments.length) return frequency;
  	frequency = value;
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

  object.thresholds = function(value){
  	if(!arguments.length) return thresholds;
  	thresholds = value;
  	return object;
  };

	return object;
}