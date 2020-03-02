let arrowUtility = (function () {

    let createBreadcrumbs = function(breadData) {

        let breadDiv = d3.select("#breadcrumbs");

        let x = d3.select('.article-text').node().getBoundingClientRect().left;
        console.log(x);

        breadData.forEach(function(d, i) {

            let breadSpan = breadDiv.append("span");
            let breadSvg = breadSpan.append("svg")
                .attr("height", 10)
                .attr("width", function() {
                    return (i === 0) ? x : 34;
                });
            drawArrow(breadSvg);

            breadDiv.append("span")
                .attr("class", "breadcrumbs-text interface-text")
                .append("a")
                .attr("href", d.link)
                .html(d.item);

        });
    };

    let drawArrow = function(breadArrow) {

        //let breadArrow = d3.select("#breadcrumbs-arrow-svg");
        //let breadArrow = d3.selectAll(selection);
        let w = breadArrow.style("width").replace("px", "");
        let h = breadArrow.style("height").replace("px", "");

        setupDef(breadArrow);

        breadArrow.each(function() {
                w = d3.select(this).style("width").replace("px", "");
            })
            .append("line")
            .attr("x1", 0)
            .attr("y1", (h / 2))
            .attr("x2", w)
            .attr("y2", (h / 2))
            .attr("class", "breadcrumbs-arrow-style")
            .attr('marker-end', 'url(#arrowhead)');

    };

    let setupDef = function (svg) {

        svg.append('defs').append('marker')
            .attr("id", "arrowhead")
            .attr("class", "breadcrumbs-arrow-style")
            .attr('viewBox', '-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
            .attr('refX', 5) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M 0,-4.5 L 4.5,0 L 0,4.5');

    };

    return {
        drawArrow: drawArrow,
        createBreadcrumbs: createBreadcrumbs
    }

}());