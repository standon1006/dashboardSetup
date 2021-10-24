d3.csv("data.csv", function(data) {
				d3.select(#output").html(
					  data.map(function(d){
					return d.wk;
			})
			);
});



