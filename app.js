
const datas = [
    { year : "2020", week : "34", Segment : "abc", Region : "India", value : 47 },
    { year : "2020", week : "35", Segment : "bcd", Region : "JAPAN", value : 81 },
    { year : "2021", week : "36", Segment : "def", Region : "JAPAN", value : 33 },
    { year : "2021", week : "37", Segment : "def", Region : "India", value : 54.21 },
    { year : "2021", week : "38", Segment : "ijk", Region : "EMEA", value : 41.78 },
    { year : "2019", week : "39", Segment : "sdf", Region : "America", value : 41.78 },
    { year : "2018", week : "40", Segment : "sdf", Region : "JAPAN", value : 41.78 },
    { year : "2019", week : "41", Segment : "abc", Region : "India", value : 41.78 },
    { year : "2017", week : "42", Segment : "bcd", Region : "India", value : 41.78 },
]
const area = document.querySelector("#bar")
const body = document.querySelector('body')
body.onresize = function(){
    const barSVG = document.querySelector("#svg-bar")
    if(barSVG != null){
        barSVG.remove()
        drawBarChart()
    }
    const lineSVG = document.querySelector('#svg-line')
    if(lineSVG != null){
        lineSVG.remove()
        drawLineChart()
    }    
    const pieSVG =  document.querySelector('#svg-pie')
    if(pieSVG != null){
        pieSVG.remove()
        drawPieChart()
    }
}
drawBarChart()
function drawBarChart(){

    const   margin  = {y : 40, x : 60},
            width   = area.offsetWidth - (2 * margin.x),
            height  = area.offsetHeight - (2 * margin.y);
    const svg = d3.select(area).append("svg")
    svg.attr("width",width + (2 * margin.x))
    .attr("height",height + (2 * margin.y))
    .attr('id','svg-bar')
    const chart = svg.append('g')
    .attr('transform',`translate(${margin.x},${margin.y})`)

    const yScale = d3.scaleLinear()
    .range([height,0])
    .domain([0, 100])

    chart.append('g')
    .attr('class','axis')
    .call(d3.axisLeft(yScale))

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(datas.map((d) => d.year))
    .padding(0.2)

    chart.append('g')
    .attr('class','axis')
    .attr('transform',`translate(0,${height})`)
    .call(d3.axisBottom(xScale))


    
    //Draw grid
    chart.append('g')
    .attr('class', 'grid-hline')
    .call(d3.axisLeft().scale(yScale).tickSize(-width,0,0).tickFormat(''))
    //End Draw grid
    

    //Top Title
    svg.append('text')
    .attr('x', (width / 2) + margin.x)
    .attr('y', margin.y / 2)
    .attr('class','title')
    .attr('text-anchor','middle')
    .text('Performance Thoughout the Year')
    //End Top Title

    //x Axis Title
    svg.append('text')
    .attr('x', (width / 2) + margin.x)
    .attr('y', (margin.y * 2))
    .attr('transform',`translate(0,${height - (margin.y / 4) })`)
    .attr('class','title')
    .text('Years')
    //End x axis title

    //y Axis Title
    svg.append('text')
    .attr('class', 'title')
    .attr('x',-(height/2) - margin.y)
    .attr('y', margin.x / 2.4)
    .attr('transform', 'rotate(-90)')
    .text('Values')
    //End y Axis Title


    chart.selectAll('rect')
    .data(datas)
    .enter()
        .append('rect')
        .attr('class','bar')
        .attr('x', (d) => xScale(d.year))
        .attr('y', (d) => yScale(d.value))
        .attr('height', (d) => height - yScale(d.value))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function(){
            d3.select(this).attr('class','hover-bar')
        })
        .on('mouseleave', function(){
            d3.select(this).attr('class','bar')
        })
    
    chart.selectAll('text')
    .data(datas)
    .enter()
        .append("text")
        .text(function(d) {
            return d.value
        })
        .attr("y", function(d, i) {
            return height - yScale(+d.value) - 2
        })
        .attr("x", function(d, i) {
            return xScale.bandwidth() * i
        })
        .attr("fill", "#A64C38")

}

drawLineChart()
function drawLineChart(){
    const area = document.querySelector('#line')
    const   margin  = {y : 40, x : 60},
    width   = area.offsetWidth - (2 * margin.x),
    height  = area.offsetHeight - (2 * margin.y);
    const svg = d3.select(area).append("svg")
    svg.attr("width",width + (2 * margin.x))
    .attr("height",height + (2 * margin.y))
    .attr('id','svg-line')
    const chart = svg.append('g')
    .attr('transform',`translate(${margin.x},${margin.y})`)

    const yScale = d3.scaleLinear()
    .range([height,0])
    .domain([0, 100])

    chart.append('g')
    .attr('class','axis')
    .call(d3.axisLeft(yScale))

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(datas.map((d) => d.week))
    .padding(0.2)

    chart.append('g')
    .attr('class','axis')
    .attr('transform',`translate(0,${height})`)
    .call(d3.axisBottom(xScale))

    //Draw grid
    chart.append('g')
    .attr('class', 'grid-hline')
    .call(d3.axisLeft().scale(yScale).tickSize(-width,0,0).tickFormat(''))
    //End Draw grid

    //Top Title
    svg.append('text')
    .attr('x', (width / 2) + margin.x)
    .attr('y', margin.y / 2)
    .attr('class','title')
    .attr('text-anchor','middle')
    .text('Performance in Weeks')
    //End Top Title

    //x Axis Title
    svg.append('text')
    .attr('x', (width / 2) + margin.x)
    .attr('y', (margin.y * 2))
    .attr('transform',`translate(0,${height - (margin.y / 4) })`)
    .attr('class','title')
    .text('Weeks')
    //End x axis title

    //y Axis Title
    svg.append('text')
    .attr('class', 'title')
    .attr('x',-(height/2) - margin.y)
    .attr('y', margin.x / 2.4)
    .attr('transform', 'rotate(-90)')
    .text('Values')
    //End y Axis Title

    const line = d3.line()
    .x(function(d,i){ return xScale(d.week) })
    .y(function(d,i){ return yScale(d.value) })
    .curve(d3.curveMonotoneX)

    chart.append('path')
    .datum(datas)
    .attr('class','line')
    .attr('d',line)

}
drawPieChart()
function drawPieChart(){
    const good_datas = []
    let total = 0
    for(let i = 0; i < datas.length; i++){
        total = +datas[i].value + +total
    }
    for(let i = 0; i < datas.length; i++){
        good_datas.push(
            {
                value : datas[i].value/total, 
                color : "#AA" + Math.ceil(Math.random() * 10000),
                title : datas[i].Region
            })
    }

    const area = document.querySelector('#pie')
    const   margin  = {y : 40, x : 60},
    width   = area.offsetWidth - (2 * margin.x),
    height  = area.offsetHeight - (2 * margin.y);
    const svg = d3.select(area).append("svg")
    svg.attr("width",width + (2 * margin.x))
    .attr("height",height + (2 * margin.y))
    .attr('id','svg-pie')
    const chart = svg.append('g')
    .attr('transform',`translate(${(width + (2 * margin.x)) / 4},${(height + (2 * margin.y)) / 2})`)
    const legend = svg.append('g')
    .attr('transform',`translate(${(width + (2 * margin.x)) / 2},${margin.y})`)

    //Top Title
    svg.append('text')
    .attr('x', (width / 2) + margin.x)
    .attr('y', margin.y / 2)
    .attr('class','title')
    .attr('text-anchor','middle')
    .text('Distribution by Segment')
    //End Top Title

    const radius = (width < height) ? width / 2 : height / 2;

    const arc = d3.arc()
    .innerRadius(radius)
    .outerRadius(0)

    const pie = d3.pie().value(function(d,i){ return d.value })

    chart.selectAll('arc')
    .data(pie(good_datas))
    .enter()
        .append('path')
        .attr('d',arc)
        .style('fill',function(d,i){ return good_datas[i].color })
    legend.selectAll('circle')
    .data(good_datas)
    .enter()
        .append('circle')
        .attr('r',5)
        .attr('cx',20)
        .attr('cy', function(d,i){ return i*20 })
        .attr('fill',function(d,i){ return d.color })
    legend.selectAll('text')
        .data(good_datas)
        .enter()
        .append('text')
            .attr('class','title')
            .attr('x',50)
            .attr('y', function(d,i){ return 5 + (i * 20) })
            .text(function(d,i){ return d.title })
}
