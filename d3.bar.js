/*
* Define line graph 
*/
function bar(){
  // Default settings
  var $el = d3.select("body")
  var width = 300;
  var height = 200;
  var color = "steelblue";
  var margin = { top: 10, right: 30, bottom: 30, left: 30 };
  var data = [];	// [{name: value, value: value },{},...]
  var svg, xAxis, yAxis, line, y, x, bars, labels;

  var object = {};

  // Method for render/refresh graph
  object.render = function(){
  	if(!svg){ 	// Render first time
  		x = d3.scale.ordinal().rangeRoundBands([0, width], .05)
  			.domain(data.map(function(d) { return d.name; }));

      y = d3.scale.linear()
      	.range([height, 0])
      	.domain([0, d3.max(data, function(d) { return d.value; })]);

      xAxis = d3.svg.axis()
	      .scale(x)
	      .orient("bottom");

      yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      svg = $el.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

      svg.append("g")
      	.attr("class", "y axis")
      	.call(yAxis);

     	bars = svg.selectAll(".bar")
     		.data(data, function(d){ return d.name; })
     		.enter().append("rect")
     		.attr("class", "bar")
     		.attr("x", function(d){ return x(d.name); })
     		.attr("y", function(d){ return y(d.value); })
     		.attr("height", function(d){ return height - y(d.value); })
     		.attr("width", x.rangeBand());

      labels = svg.selectAll("text")
        .data(data, function(d){ return d.name; })
        .enter()
        .append("text")
        .attr("x", function(d, i){ return i * (width / data.length) + (width / data.length - .05) / 2; })
        .attr("y", function(d){ return y(d.value) + 14; })
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(function(d){ return d.value; });

  	}else{		// refresh
  		object.data(data);
  		x.domain(data.map(function(d) { return d.name; }));
  		y.domain([0, d3.max(data, function(d) { return d.value; })]);

  		svg.select("g.x")
	      .transition()
        .duration(1000)
        .call(xAxis);

      svg.select("g.y")
      	.transition()
        .duration(1000)
        .call(yAxis);

      bars = svg.selectAll(".bar").data(data, function(d){ return d.name; });

     	bars.transition()
     		.duration(1000)
     		.attr("x", function(d){ return x(d.name); console.log(d.name); })
     		.attr("y", function(d){ return y(d.value); })
     		.attr("height", function(d){ return height - y(d.value); })
     		.attr("width", x.rangeBand());

      labels = svg.selectAll("text").data(data, function(d){ return d.name; });
      labels.transition()
        .duration(1000)
        .attr("x", function(d, i){ return i * (width / data.length) + (width / data.length - .05) / 2; })
        .attr("y", function(d){ return y(d.value) + 14; })
        .text(function(d){ return d.value; });
  	}
  	return object;
  }

  // Getter and setter methods
  object.data = function(value){
    if (!arguments.length) return data;
    data = value;
    return object;
  };

  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    return object;
  };

  object.color = function(value){
    if (!arguments.length) return color;
    color = value;
    return object;
  };

  return object;
  
}