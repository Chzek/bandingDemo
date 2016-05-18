/*
* Define line graph 
*/
function multiLine(){
  // Default settings
  var $el = d3.select("body");
  var margin = { top: 10, right: 30, bottom: 30, left: 30 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var color = "steelblue";
  var data = [];  // [[{ x: value, y:value }, {...},... ],[]... ]
  var x = d3.scale.linear().range([0, width]);
  var svg, y, xAxis, yAxis, series, line;

  var object = {
    $el: $el,
    width: width,
    height: height,
    color: color,
    data: data,
    x: x
  };

  // Method for render/refresh graph
  object.render = function(){
    if(!svg){ // Render first time
      y = d3.scale.linear()
      .range([height, 0]);

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
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain([d3.min(data, function(data){ return d3.min(data, function(d){ return d.x; }); }),
        d3.max(data, function(data){ return d3.max(data, function(d){ return d.x; }); })]
      );
      y.domain([d3.min(data, function(data){ return d3.min(data, function(d){ return d.y; }); }),
        d3.max(data, function(data){ return d3.max(data, function(d){ return d.y; }); })]
      );

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      series = svg.selectAll(".series")
        .data(data, function(d, i){ return i; })
        .enter()
        .append("g")
        .attr("class", "series");

      series.append("path")
        .attr("class", "line")
        .attr("stroke", function(d, i){
          if(typeof(color) === "object"){
            return color[i];
          }else{
            return color;
          }
        })
        .attr("d", line);
    }else{ //Refresh
      object.data(data);
      y.range([height, 0]);
      x.range([0, width]);

      x.domain([d3.min(data, function(data){ return d3.min(data, function(d){ return d.x; }); }),
        d3.max(data, function(data){ return d3.max(data, function(d){ return d.x; }); })]
      );
      y.domain([d3.min(data, function(data){ return d3.min(data, function(d){ return d.y; }); }),
        d3.max(data, function(data){ return d3.max(data, function(d){ return d.y; }); })]
      );

      svg.select("g.y")
        .transition()
        .duration(1000)
        .call(yAxis);

      svg.select("g.x")
        .transition()
        .duration(1000)
        .call(xAxis);

      series = svg.selectAll(".series")
        .data(data, function(d, i){ return i; });

      series.select("path")
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

  object.x = function(value){
    if (!arguments.length) return x;
    x = value;
    return object;
  };

  return object;
}