/*
* Define histogram
*/
function histogram(){
  // Default settings
  var $el = d3.select("body");
  var margin = { top: 10, right: 20, bottom: 30, left: 20 };
  var width = 400 - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;
  var color = "steelblue";
  var data = [];	// [val, val]
  var binCount = 40;
  var mouseOver = function(d){ return false; };
  var mouseLeave = function(d){ return false; };
  var mouseClick = function(d){ return false; };
  var svg, xAxis, yAxis, line, y, x, bar, labels;
  var formatCount = d3.format(",.0f");

  var object = {
    $el: $el,
    width: width,
    height: height,
    color: color,
    data: data,
    binCount: binCount,
    mouseOver: mouseOver,
    mouseLeave: mouseLeave,
    mouseClick: mouseClick
  };

  // Method for render/refresh graph
  object.render = function(){
  	if(!svg){ 	// Render first time
      var values = data;

      x = d3.scale.linear()
        .domain(d3.extent(values))
        .range([0, width]);

      var data1 = d3.layout.histogram()
        .bins(binCount)(values);

      y = d3.scale.linear()
        .domain([0, d3.max(data1, function(d) { return d.y; })])
        .range([height, 0]);

      xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      svg = $el.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      bar = svg.selectAll(".bar")
        .data(data1, function(d, i){return i;})
        .enter().append("g")
        .attr("class", "bar")
        .attr('fill', color)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

      bar.append("rect")
        .attr("x", 0)
        .attr("width", width/binCount)
        .attr("height", function(d) { return height - y(d.y); })
        .attr("stroke", "black");

      bar.append("text")
        .attr("dy", ".75em")
        .attr("y", function(d){ if(y(d.y) + 15 >= height){ return -10; }else{ return 6;} })
        .attr("x", function(d){ return (width/binCount)/2; })
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.y); });

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

  	}else{		// refresh
  		object.data(data);
      var values = data;

      x.domain(d3.extent(values))
        .range([0, width]);

      var data1 = d3.layout.histogram()
        .bins(binCount)(values);

      y.domain([0, d3.max(data1, function(d) { return d.y; })])
        .range([height, 0]);      

      bar.remove();

      bar = svg.selectAll(".bar").data(data1, function(d, i){return i;});

      bar.enter().append("g")
        .attr("class", "bar")
        .attr('fill', color)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

      bar.append("rect")
        .attr("x", 0)
        .attr("width", width/binCount)
        .attr("height", function(d) { return height - y(0); })
        .attr("stroke", "black");

      bar.append("text")
        .attr("dy", ".75em")
        .attr("y", function(d){ if(y(d.y) + 15 >= height){ return -10; }else{ return 6;} })
        .attr("x", function(d){ return (width/binCount)/2; })
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.y); });

      bar.transition()
        .duration(1000)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .select('rect')
        .attr("height", function(d) { return height - y(d.y); })
        .select('text')
        .attr("y", function(d){ if(y(d.y) + 15 >= height){ return -10; }else{ return 6;} })
        .attr("x", function(d){ return (width/binCount)/2; })
        .text(function(d) { return formatCount(d.y); });

      bar.exit().remove();

      svg.select("g.x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);
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

  object.binCount = function(value){
    if (!arguments.length) return binCount;
    binCount = value;
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