/*
* Define line graph 
*/
function generator(){
	// Default settings
	var days = 8;
	var growth = 70;

	/*	f(x) = A sin(wt + p)
	 *	A is the amplitude
	 *	w is the frequency
	 *	p is the phase
	 */

	var amplitude = 50;
	var intervals = 96;	// Intervals per wave (96/day to imitate utilization)
	
	var frequency = 2 * Math.PI / intervals;
	var data = [];
	var counter = 0;
	
	var noise = d3.random.normal(5, 5);
	
	var increase = Math.PI * 2 / 96;
	var increment = 0;

	var object = {};

	object.calculate = function(){
		for ( i = 0; i < days; i += 0.01 ) {
			// var point = (Math.sin( counter ) / 2 + 0.5) * (base + (growth/days * Math.round(i))) + noise();
			var point = (amplitude + (growth / days * Math.round(i))) * (Math.sin(counter) / 2 + .5) + noise();

			if(point > 100){
		  	point = 100;
			}else if(point < 0){
		  	point = 0;
		  }
		  data.push({
		  	x: increment,
		  	y: point
		  });
		  counter += increase;
		  increment++;
		};
		return data;
	}

  object.days = function(value){
    if (!arguments.length) return days;
    days = value;
    return object;
  };

  object.base = function(value){
    if (!arguments.length) return base;
    base = value;
    return object;
  };

  object.growth = function(value){
    if (!arguments.length) return growth;
    growth = value;
    return object;
  };

	return object;
}