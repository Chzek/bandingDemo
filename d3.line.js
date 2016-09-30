/*
* Define line graph 
*/
function line(){
  // Default settings
  var $el = d3.select("body");
  var margin = { top: 0, right: 0, bottom: 0, left: 0 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var color = "steelblue";
  var data = [];  // [{ x: value, y:value }, {...}, ...]
  var x = d3.scale.linear().range([0, width]);
  var title = "";
  var svg, y, xAxis, yAxis, line;

  var object = {
    $el : $el,
    width: width,
    height: height,
    color: color,
    data: data,
    title: title,
    x: x
  };

  // Method for render/refresh graph
  object.render = function(){
    if(!svg){ // Render first time
      y = d3.scale.linear()
      .range([height, 0]);

      x = d3.scale.linear().range([0, width]);  // TODO: Need to check this out in bandingDemo

      xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

      yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });
       // .interpolate("basis");

      svg = $el.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class", "nmars-line")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(d3.extent(data, function(d) { return d.x; }));
      y.domain(d3.extent(data, function(d) { return d.y; }));

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("stroke", color)
        .attr("d", line);

      /* need to figure out what options should be available here */
      svg.append("text")
        .attr("x", 2)         // Possible option, center (width/2), left (margin.left || 2)         
        .attr("y", height - 5)
        .attr("text-anchor", "left")  // Possible option
        .style("font-size", "16px")     // Possible option
        .text(title);
    }else{ //Refresh
      object.data(data);
      y.range([height, 0]);
      x.range([0, width]);

      x.domain(d3.extent(data, function(d) { return d.x; }));
      y.domain(d3.extent(data, function(d) { return d.y; }));

      svg.select("g.y")
        .transition()
        .duration(1000)
        .call(yAxis);

      svg.select("g.x")
        .transition()
        .duration(1000)
        .call(xAxis);

      svg.selectAll("path.line")
       .datum(data)
        .transition()
        .duration(1000)
       .attr("d", line);
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

  object.title = function(value){
    if (!arguments.length) return title;
    title = value;
    return object;
  };

  object.x = function(value){
    if (!arguments.length) return x;
    x = value;
    return object;
  };

  return object;
}