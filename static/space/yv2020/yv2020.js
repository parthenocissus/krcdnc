document.addEventListener("DOMContentLoaded", function () {

    let unit = 50, margin = 4,
        col = 21, row = col, dim = col,
        points = [],
        w = (unit * (col - 1)) + (2 * margin),
        h = w * 0.8,
        intrvl = 8000;

    let randomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let lineCount = randomInt(40, 120);

    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            points.push({
                x: i,
                y: j
            });
        }
    }

    let genericMatrix = [], matrixLen = (dim * 2);

    for (let i = 0; i < matrixLen; i++) {
        let vertical = {x: dim, y: i},
            horizontal = {x: i, y: dim},
            diag1 = {x: i, y: i},
            diag2 = {x: matrixLen - i, y: i};
        if (i !== dim) {
            genericMatrix.push(vertical, horizontal, diag1, diag2);
        }
    }

    let notUsed = function (point, usedP) {
        let value = true;
        usedP.forEach(function (item) {
            if (item === undefined) {
                return pMatrix;
            } else if ((item.x === point.x) && (item.y === point.y)) {
                value = false;
            }
        });
        return value;
    };

    let pointMatrix = function (p, usedPoints) {
        let pMatrix = [];
        if (p === undefined) return pMatrix;
        genericMatrix.forEach(function (gp) {
            let a = {
                x: gp.x + p.x - dim,
                y: gp.y + p.y - dim
            };
            if ((a.x >= 0) && (a.y >= 0) && (a.x < dim) && (a.y < dim) && notUsed(a, usedPoints)) {
                pMatrix.push(a);
            }
        });
        return pMatrix;
    };

    let cleanArray = function (array, p) {
        if (p === undefined) return array;
        array.forEach(function (item, index) {
            if ((p.x === item.x) && (p.y === item.y)) {
                array.splice(index, 1);
            }
        });
        return array;
    };

    let generateLines = function () {

        let lines = [],
            workingPoints = JSON.parse(JSON.stringify(points)),
            usedPoints = [];

        for (let i = 0; i < lineCount; i++) {

            let line = [];
            let n = randomInt(1, 3);
            let index = Math.floor(Math.random() * workingPoints.length);
            let current = workingPoints[index];

            workingPoints.splice(index, 1);
            line.push(current);
            usedPoints.push(current);

            for (let j = 0; j < n; j++) {
                let pMatrix = pointMatrix(current, usedPoints);
                let ind = Math.floor(Math.random() * pMatrix.length);
                current = pMatrix[ind];
                if (current !== undefined) {
                    line.push(current);
                    usedPoints.push(current);
                    workingPoints = cleanArray(workingPoints, current);
                }
            }

            if (line.length > 1) {
                lines.push(line);
            }

        }

        return lines;

    };

    let mapping = d3.line()
        .x(d => {
            return d.x * unit + margin;
        })
        .y(d => {
            return d.y * unit + margin;
        })
        .curve(d3.curveLinear);

    // Drawing With D3

    let svg = d3.select("#ground")
        .append("svg")
        .attr("viewBox", "0 0 " + w + " " + h);
    //.attr("preserveAspectRatio", "xMinYMin meet");

    let plotLines = function (lines, className) {

        let linesIn = {
            delayMin: 0,
            delayMax: intrvl * 0.1,
            durMin: intrvl * 0.22,
            durMax: intrvl * 0.27
        }, linesOut = {
            delayMin: intrvl * 0.4,
            delayMax: intrvl * 0.5,
            durMin: intrvl * 0.1,
            durMax: intrvl * 0.15
        };

        let gr = svg.append("g");

        lines.forEach(function (line, index) {
            let first = line[0];
            let emptyLine = JSON.parse(JSON.stringify(line)); //Array.from(line);
            emptyLine.forEach(function (p) {
                p.x = first.x;
                p.y = first.y;
            });

            let pth = gr.append("path")
                .attr("d", mapping(line))
                .classed(className, true);

            let totalLength = pth.node().getTotalLength();

            pth.attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .delay(randomInt(linesIn.delayMin, linesIn.delayMax))
                .duration(randomInt(linesIn.durMin, linesIn.durMax))
                .ease(d3.easePolyOut)
                .attr("stroke-dashoffset", 0);

            pth.transition()
                .delay(randomInt(linesOut.delayMin, linesOut.delayMax))
                .duration(randomInt(linesOut.delayMin, linesOut.delayMax))
                .ease(d3.easePolyInOut)
                .attr("stroke-dashoffset", totalLength);
        });

    };

    let drawDots = function () {

        let g = svg.append("g");

        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                g.append("circle")
                    .attr("cx", j * unit + margin)
                    .attr("cy", i * unit + margin)
                    .attr("r", 3)
                    .style("fill", "yellow")
                    .style("stroke", "none");
                g.append("text")
                    .attr("x", j * unit + margin)
                    .attr("y", i * unit + margin + 15)
                    .text("" + j + ", " + i);
            }
        }

    };

    let yvLines = [
        [{x: 2, y: 4}, {x: 2, y: 5}, {x: 3, y: 4}, {x: 3, y: 5}], // и
        [{x: 4, y: 4}, {x: 4, y: 5}, {x: 5, y: 4}, {x: 4, y: 4}], // в1
        [{x: 4, y: 5}, {x: 5, y: 5}, {x: 4, y: 6}, {x: 4, y: 5}], // в2
        [{x: 6, y: 4}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 7, y: 4}, {x: 6, y: 4}], // o
        [{x: 8, y: 3}, {x: 8, y: 4}, {x: 9, y: 4}, {x: 9, y: 5}], // н1
        [{x: 8, y: 4}, {x: 8, y: 5}], // н2
        [{x: 9, y: 4}, {x: 9, y: 3}], // н3
        [{x: 10, y: 5}, {x: 11, y: 5}, {x: 11, y: 4}, {x: 10, y: 5}], // а
        [{x: 3, y: 7}, {x: 2, y: 7}, {x: 2, y: 8}, {x: 3, y: 8}], // с
        [{x: 4, y: 7}, {x: 5, y: 7}, {x: 4, y: 8}, {x: 4, y: 7}], // р
        [{x: 4, y: 8}, {x: 4, y: 9}], // р2
        [{x: 7, y: 8}, {x: 6, y: 8}, {x: 7, y: 7}, {x: 6, y: 7}, {x: 6, y: 8}], // е
        [{x: 8, y: 7}, {x: 9, y: 7}, {x: 9, y: 9}], // ћ1
        [{x: 9, y: 8}, {x: 10, y: 8}, {x: 10, y: 9}], // ћ2
        [{x: 11, y: 8}, {x: 12, y: 7}, {x: 12, y: 8}, {x: 11, y: 8}], // а
        [{x: 14, y: 8}, {x: 14, y: 7}, {x: 13, y: 7}, {x: 13, y: 8}], // н
        [{x: 2, y: 11}, {x: 2, y: 10}, {x: 2, y: 9}, {x: 3, y: 9}, {x: 2, y: 10}], // р
        [{x: 3, y: 10}, {x: 3, y: 12}, {x: 4, y: 12}, {x: 4, y: 10}, {x: 3, y: 10}], // о
        [{x: 5, y: 11}, {x: 6, y: 11}, {x: 7, y: 11}, {x: 7, y: 10}, {x: 6, y: 10}, {x: 6, y: 9}, {x: 5, y: 9}], // ђ
        [{x: 9, y: 11}, {x: 8, y: 11}, {x: 9, y: 10}, {x: 8, y: 10}, {x: 8, y: 11}], // е
        [{x: 10, y: 11}, {x: 10, y: 10}, {x: 11, y: 10}, {x: 11, y: 11}], // н
        [{x: 11, y: 12}, {x: 12, y: 12}, {x: 13, y: 12}, {x: 13, y: 11}, {x: 13, y: 10}, {x: 12, y: 11}, {
            x: 11,
            y: 12
        }], // д
        [{x: 14, y: 10}, {x: 15, y: 11}, {x: 14, y: 11}, {x: 14, y: 10}], // а
        [{x: 17, y: 11}, {x: 17, y: 10}, {x: 16, y: 10}, {x: 16, y: 11}] // н
    ];

    let main = function () {
        d3.selectAll("svg > *").remove();
        let generative = generateLines();
        let lns = yvLines.concat(generative);
        plotLines(generative, "gen");
        plotLines(yvLines, "yv");
        // drawDots();
        setTimeout(main, intrvl);
    };
    main();

});
