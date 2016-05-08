/*
* Define line graph 
*/
function donut(){  
  // Default settings
  var $el = d3.select("body");
  var margin = { top: 10, right: 10, bottom: 10, left: 10 };
  var width = 200 - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;
  var radius = Math.min(width, height) / 2;
  var color = d3.scale.category20();
  var data = [];  // [{name: "value", value: value},{},...]
  // var showTitle = true;

  var currentVal;
  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });

  var svg, g, arc; 

  var object = {
    $el: $el,
    width: width,
    height: height,
    radius: radius,
    color: color,
    data: data
  };

  // Method for render/refresh graph
  object.render = function(){
    if(!svg){
      arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - (radius/3.5));

      svg = $el.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + (width + margin.left + margin.right) / 2 + "," + (height + margin.top + margin.bottom) / 2 + ")");

      g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        // Attach current value to g so that we can use it for animation
        .each(function(d) { this._current = d; })
        .attr("d", arc)
        .attr("fill", function(d, i){
          if(typeof(color) === "object"){
            return color[i];
          }else{
            return color;
          }
        })
        .attr("stroke", "white")
        .on("mouseover", function(d){
          svg.select("text.text-tooltip")
            .attr("fill", "black")
            .text(d.value);
        });

      g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle");

      g.select("text").text(function(d) { return d.data.name; });

      svg.append("text")
        .datum(data)
        .attr("x", 0 )
        .attr("y", 0 + radius/10 )
        .attr("class", "text-tooltip")        
        .style("text-anchor", "middle")
        .attr("font-weight", "bold")
        .style("font-size", radius/2.5+"px");

      g.on("mouseout", function(obj){
        svg.select("text.text-tooltip").text("");
      });

    }else{
      radius = Math.min(width, height) / 2;
      arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - (radius/3.5));

      object.data(data);
      g.data(pie(data)).exit().remove();

      g.select("path")
      .transition().duration(200)
      .attrTween("d", function(a){
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
      });

      g.select("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; });

      svg.select("text.text-tooltip").datum(data);
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
    width = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  object.radius = function(value){
    if (!arguments.length) return radius;
    radius = value;
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

  return object;
}