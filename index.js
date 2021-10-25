d3.csv("data.csv", function(error, csv) {
        if (error) return console.warn(error);

        csv.forEach(function(d){ (d['value'] = +d['value']); });
        console.log(data);
				
					
					
			
			
});



