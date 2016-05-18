/*
* Define a scatter plot
*/
function scatter(){
  // Default settings
  var $el = d3.select("body");
  var margin = { top: 10, right: 30, bottom: 30, left: 30 };
  var width = 300 - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;
  var color = "steelblue";
  var data = [];	// [{x: value, y: value },{},...]
  var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);
  var mouseOver = function(d){ return false; };
  var mouseLeave = function(d){ return false; };
  var mouseClick = function(d){ return false; };
  var svg, xAxis, yAxis, dots;

  var object = {
    $el: $el,
    width: width,
    height: height,
    color: color,
    data: data,
    mouseOver: mouseOver,
    mouseLeave: mouseLeave,
    mouseClick: mouseClick
  };

  // Method for render/refresh graph
  object.render = function(){
  	if(!svg){ 	// Render first time
  		x.domain([d3.min(data, function(d) { return d.x; }), d3.max(data, function(d) { return d.x; })]);
      y.domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.y; })]);

      x.range([0, width]);
      y.range([height, 0]);
      
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

      dots = svg.selectAll(".dot")
        .data(data, function(d){ return d.x; })
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 2)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .style("fill", function(d) { return "blue"; });

  	}else{		// refresh
  		object.data(data);
  		x.domain([d3.min(data, function(d) { return d.x; }), d3.max(data, function(d) { return d.x; })]);
      y.domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.y; })]);

      x.range([0, width]);
      y.range([height, 0]);

  		svg.select("g.x")
	      .transition()
        .duration(1000)
        .call(xAxis);

      svg.select("g.y")
      	.transition()
        .duration(1000)
        .call(yAxis);

      dots = svg.selectAll(".dot").data(data, function(d){ return d.x; });

      dots
        .transition()
        .duration(1000)
        .attr("r", 2)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .style("fill", function(d) { return "red"; });

      dots
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 2)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .style("fill", function(d) { return "blue"; });

      dots.exit().remove();

  	}
  	return object;
  };

  // Getter and setter methods
  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value - margin.left - margin.right;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value - margin.top - margin.bottom;
    return object;
  };

  object.color = function(value){
    if (!arguments.length) return color;
    color = value;
    return object;
  };

  object.data = function(value){
    if (!arguments.length) return data;
    data = value;
    return object;
  };

  object.mouseOver = function(value){
    if (!arguments.length) return mouseOver;
    mouseOver = value;
    return object;
  };

  object.mouseLeave = function(value){
    if (!arguments.length) return mouseLeave;
    mouseLeave = value;
    return object;
  };

  object.mouseClick = function(value){
    if (!arguments.length) return mouseClick;
    mouseClick = value;
    return object;
  };

  return object;
}