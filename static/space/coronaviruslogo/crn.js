$(document).ready(function () {

    let w = window.innerWidth,
        h = window.innerHeight,
        center = {"x": w / 2, "y": h / 2};

    let rayMax = 40;
    let rayData = [];

    let cr = 0, stroke = 0;

    let generate = function () {

        rayData = [];

        let crMin = 50,
            crMax = 250,
            crTipMin = 0,
            crTipMax = 10;

        let tipThin = Math.floor(randomMinMax(0, 5));
        rayCount = Math.floor(randomMinMax(7, rayMax));
        alphaInc = randomMinMax(0, 2 * Math.PI);
        cr = randomMinMax(crMin, crMax);
        stroke = Math.floor(randomMinMax(1, 4));

        let r1min = cr - 20,
            r1max = cr,
            r2min = cr + 20,
            r2max = cr + 50;

        for (let i = 0; i < rayMax; i++) {

            let alpha, r1, r2, cr, even, crTip;

            if (i < rayCount) {
                alpha = (i * 2 * Math.PI / rayCount) + alphaInc;
                r1 = randomMinMax(r1min, r1max);
                r2 = randomMinMax(r2min, r2max);
                cr = randomMinMax(crMin, crMax);
                crTip = randomMinMax(crTipMin, crTipMax);
                even = (i % tipThin === 0);
            } else {
                alpha = 0;
                r1 = 0;
                r2 = 0;
                cr = 0;
                even = 1;
                crTip = 0;
            }
            rayData.push({
                "x1": center.x + r1 * Math.cos(alpha),
                "y1": center.y + r1 * Math.sin(alpha),
                "x2": center.x + r2 * Math.cos(alpha),
                "y2": center.y + r2 * Math.sin(alpha),
                "cx": even ? center.x + r2 * Math.cos(alpha) : center.x,
                "cy": even ? center.y + r2 * Math.sin(alpha) : center.y,
                "r": even ? crTip : 0
            });
        }

        rayData = shuffle(rayData);
    };

    generate();

    let svg = d3.select("body")
        .append("svg")
        .attr("viewBox", "0 0 " + w + " " + h);

    let crc = svg.append("circle")
        .attr("cx", center.x)
        .attr("cy", center.y)
        .attr("r", cr)
        .style("stroke", stroke);

    let rays = svg.selectAll("line")
        .data(rayData)
        .enter()
        .append('line')
        .attr('x1', d => d.x1)
        .attr('y1', d => d.y1)
        .attr('x2', d => d.x2)
        .attr('y2', d => d.y2);

    let rayTips = svg.selectAll("circle")
        .data(rayData)
        .enter()
        .append('circle')
        .attr('cx', d => d.cx)
        .attr('cy', d => d.cy)
        .attr('r', d => d.r);

    let animateSVG = function () {

        rays.data(rayData)
            .transition().duration(600)
            .ease(d3.easePolyOut)
            .attr('x1', d => d.x1)
            .attr('y1', d => d.y1)
            .attr('x2', d => d.x2)
            .attr('y2', d => d.y2);

        rayTips.data(rayData)
            .transition().duration(600)
            .ease(d3.easePolyOut)
            .attr('cx', d => d.cx)
            .attr('cy', d => d.cy)
            .attr('r', d => d.r);

        crc.transition().duration(600)
            .ease(d3.easePolyOut)
            .attr("r", cr)
            .style("stroke", stroke);
    };

    function randomMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    setInterval(function () {
        generate();
        animateSVG();
    }, 800);

});