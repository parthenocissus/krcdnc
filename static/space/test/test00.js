document.addEventListener("DOMContentLoaded", function () {

    let unit = 50, margin = 10;
    let col = 9, row = col, dim = col;
    let points = [];

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

    let randomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

        let lines = [];
        let lineCount = randomInt(7, 30),
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
        //.attr("viewBox", "0 0 940 500")
        .attr("viewBox", "0 0 940 500")
        .attr("preserveAspectRatio", "xMinYMin meet");

    let intrvl = 8000;

    let plotLines = function (lines) {

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

        d3.selectAll("svg > *").remove();

        let gr = svg.append("g");

        lines.forEach(function (line, index) {
            let first = line[0];
            let emptyLine = JSON.parse(JSON.stringify(line)); //Array.from(line);
            emptyLine.forEach(function (p) {
                p.x = first.x;
                p.y = first.y;
            });

            let pth = gr.append("path")
                .attr("d", mapping(line));

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

    let main = function() {
        plotLines(generateLines());
        setTimeout(main, intrvl);
    };
    main();

});
