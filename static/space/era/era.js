let generativeEra = function () {

    const multiMatrix = {w: 5, h: 7}, shiftsHor = [], shiftsVert = [];

    const w = 940, margin = 3, gMargin = 42, vertMargin = 3,
        shiftAdd = ((w - (2 * margin) - ((multiMatrix.w - 1) * gMargin)) / multiMatrix.w);

    for (let i = 0; i < multiMatrix.w; i++) {
        shiftsHor[i] = (i * (shiftAdd + gMargin));
    }

    const col = 8, row = col, dim = col,
        unit = shiftAdd / (col - 1),
        gHeight = (2 * vertMargin) + (unit * (col - 1));

    for (let j = 0; j < multiMatrix.h; j++) {
        shiftsVert[j] = (j * (gMargin + gHeight));
    }

    const h = (multiMatrix.h) * gHeight + (multiMatrix.h - 1) * gMargin + 10,
        points = [],
        num = {min: 10, max: 18},
        vert = {min: 1, max: 5},
        divName = "js-cont";

    let randomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const intrvl = 4000;

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

    let notUsed = function (point, wp) {
        let value = false;
        wp.forEach(function (item) {
            if (item === undefined) {
                return pMatrix;
            } else if ((item.x === point.x) && (item.y === point.y)) {
                value = true;
            }
        });
        return value;
    };

    let pointMatrix = function (p, wp) {
        let pMatrix = [];
        if (p === undefined) return pMatrix;
        genericMatrix.forEach(function (gp) {
            let a = {
                x: gp.x + p.x - dim,
                y: gp.y + p.y - dim
            };
            if ((a.x >= 0) && (a.y >= 0) && (a.x < dim) && (a.y < dim) && notUsed(a, wp)) {
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
            lineCount = randomInt(num.min, num.max),
            workingPoints = JSON.parse(JSON.stringify(points));

        for (let i = 0; i < lineCount; i++) {

            let line = [];
            let n = randomInt(vert.min, vert.max);
            let index = Math.floor(Math.random() * workingPoints.length);
            let current = workingPoints[index];

            workingPoints.splice(index, 1);
            line.push(current);

            for (let j = 0; j < n; j++) {
                let pMatrix = pointMatrix(current, workingPoints);
                let ind = Math.floor(Math.random() * pMatrix.length);
                current = pMatrix[ind];
                if (current !== undefined) {
                    line.push(current);
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

    let svg = d3.select("#" + divName)
        .append("svg")
        .attr("viewBox", "0 0 " + w + " " + h)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("id", "era-svg")
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 0.5)
        .style("stroke-linecap", "round")
        .style("stroke-linejoin", "round");


    let graphics = [];

    for (let i = 0; i < shiftsVert.length; i++) {
        for (let j = 0; j < shiftsHor.length; j++) {
            graphics.push({
                g: svg.append("g").attr("transform", "translate(" + shiftsHor[j] + ", " + shiftsVert[i] + ")")
            });
        }
    }

    let linesIn = {
        delayMin: 0,
        delayMax: intrvl * 0.1,
        durMin: intrvl * 0.2,
        durMax: intrvl * 0.25
    }, linesOut = {
        delayMin: intrvl * 0.4,
        delayMax: intrvl * 0.75,
        durMin: intrvl * 0.1,
        durMax: intrvl * 0.25
    };

    let plotLines = function (gr) {

        d3.selectAll("#" + divName + " svg > path").remove();

        let graphics = gr.g.append("g"), paths = [];

        generateLines().forEach(function (line, index) {

            let pth = graphics.append("path")
                .attr("d", mapping(line));

            // let totalLength = pth.node().getTotalLength();
            // pth.attr("stroke-dasharray", totalLength + " " + totalLength)
            //     .attr("stroke-dashoffset", totalLength)
            //     .transition()
            //     .delay(randomInt(linesIn.delayMin, linesIn.delayMax))
            //     .duration(randomInt(linesIn.durMin, linesIn.durMax))
            //     .ease(d3.easePolyOut)
            //     .attr("stroke-dashoffset", 0);

            paths.push(pth);

        });

        gr.paths = paths;
        return gr;

    };

    let replotLines = function (gr) {

        let paths = [], count = 0;

        gr.paths.forEach(function (path) {

            let totalLength = path.node().getTotalLength();

            path.transition()
                .delay(randomInt(linesIn.delayMin, linesIn.delayMax))
                .duration(randomInt(linesIn.durMin, linesIn.durMax))
                .ease(d3.easePolyInOut)
                .attr("stroke-dashoffset", totalLength)
                .remove();

            count++;
            if (count === gr.paths.length) {
                plotNew();
            }
        });

        function plotNew() {

            let graphics = gr.g;

            generateLines().forEach(function (line, index) {

                let pth = graphics.append("path")
                    .attr("d", mapping(line));

                let totalLength = pth.node().getTotalLength();

                pth.attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .delay(randomInt(linesOut.delayMin, linesOut.delayMax))
                    .duration(randomInt(linesOut.durMin, linesOut.durMax))
                    .ease(d3.easePolyOut)
                    .attr("stroke-dashoffset", 0);

                paths.push(pth);
            });

        }

        gr.paths = paths;
        return gr;

    };

    let delays = [4, 1, 5, 3, 0, 2];

    graphics.forEach(function (gr, index) {
        gr = plotLines(gr);
        // let replot = function() {
        //     gr = replotLines(gr);
        //     setTimeout(replot, intrvl * (delays.length - 1));
        // };
        // setTimeout(replot, intrvl * (0.38 + delays[index])); //delays[index] * intrvl);
    });


};

document.addEventListener("DOMContentLoaded", generativeEra);

window.onblur = function () {
    window.onfocus = function () {
        // location.reload(true)
        document.getElementById("js-cont").innerHTML = '';
        generativeEra();
    }
};

function saveSVG(svgElement, fileName) {
    var svgData = $(svgElement)[0].outerHTML;
    var svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        saveSVG("#era-svg", "era.svg");
    }
});