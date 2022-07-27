import nationalDishes from './country-by-national-dish'

window.addEventListener('DOMContentLoaded', () => {
    console.log("national dishes: ", nationalDishes)
    const width = 900;
    const height = 600;
    
    const svg = d3
        .select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    // console.log(svg)
    const g = svg.append('g');
    // console.log(g)
    const projection = d3.geoMercator().scale(150).translate([width / 2, height / 1.4]);
    // console.log(projection)
    const path = d3.geoPath(projection)
    // console.log(path)
    
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(data => {
            // console.log("data: ", data)
            const countries = topojson.feature(data, data.objects.countries);
            // console.log("countries: ", countries)
            g.selectAll('path').data(countries.features).enter().append('path')
            .attr('class', 'country').attr("d", path);

            // let pathings = g.selectAll('path')
            // console.log(pathings)
            g.selectAll('.country')
                ._groups[0]
                .forEach(country => {
                    country.addEventListener("mouseover", function () {
                        country.classList.add('blue')});
                        // debugger
                        // console.log(country.__data__.properties.name)
                    country.addEventListener("mouseout", function () {
                        country.classList.remove("blue")
                        // console.log(country.__data__.properties.name)
                    })
                })
        });


        
})

// console.log("webpack running!")

