/*
* Define line graph 
*/
function bar(){
  // Default settings
  var $el = d3.select("body");
  var margin = { top: 10, right: 30, bottom: 30, left: 35 };
  var width = 300 - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;
  var color = "steelblue";
  var labelColor = "white";
  var data = [];	// [{name: "value", value: value },{},...]
  var svg, xAxis, yAxis, line, y, x, bars, labels;

  var mouseOver = function(d){ return false; };
  var mouseLeave = function(d){ return false; };
  var mouseClick = function(d){ return false; };

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
     		.attr("class", function(d){ return d.name + " bar"; })
     		.attr("x", function(d){ return x(d.name); })
     		.attr("y", function(d){ return y(d.value); })
     		.attr("height", function(d){ return height - y(d.value); })
     		.attr("width", x.rangeBand())
        .attr("fill", function(d, i){
          if(typeof(color) === "object"){
            return color[i];
          }else{
            return color;
          };
        })
        .on("mouseover", mouseOver)
        .on("mouseenter", mouseLeave)
        .on("click", mouseClick);

      labels = svg.selectAll("text")
        .data(data, function(d){ return d.name; })
        .enter()
        .append("text")
        .attr("x", function(d, i){ return i * (width / data.length) + (width / data.length - .05) / 2; })
        .attr("y", function(d){ if(y(d.value) + 24 > height){ return height - 10; }else{ return y(d.value) + 14;} })
        .attr("text-anchor", "middle")
        .attr("fill", function(d, i){
          if(typeof(labelColor) === "object"){
            return labelColor[i];
          }else{
            return labelColor;
          };
        })
        .text(function(d){ return d.value; });

  	}else{		// refresh
  		object.data(data);
      x.rangeRoundBands([0, width], .05);
      y.range([height, 0]);
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
        .attr("y", function(d){ if(y(d.value) + 24 > height){ return height - 10; }else{ return y(d.value) + 14;} })
        .text(function(d){ return d.value; });
  	}
  	return object;
  };

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

  object.labelColor = function(value){
    if (!arguments.length) return labelColor;
    labelColor = value;
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
};