var datas = d3.csv("data.csv").then(function(data) {

  // Format
  data.forEach(function(d) {
    d.value = +d.value;
  });
