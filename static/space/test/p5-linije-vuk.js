document.addEventListener("DOMContentLoaded", function () {

    let p5work = function (p) {

        let cnvs, dim, col, row,
            unit = 40,
            points, pairs, margin;

        p.setup = function () {

            p.frameRate(1);

            dim = 9;
            col = row = dim;
            margin = 20;
            let d = dim * unit + 2 * margin;
            cnvs = p.createCanvas(d, d);

            points = [];
            pairs = [];

            for (let i = 0; i < col; i++) {
                for (let j = 0; j < row; j++) {
                    let pt = {
                        x: i,
                        y: j
                    };
                    points.push(pt);
                }
            }

            points.forEach(function (pt1) {
                points.forEach(function (pt2) {
                    let xDif = Math.abs(pt1.x - pt2.x),
                        yDif = Math.abs(pt1.y - pt2.y);
                    let horizontal = (xDif === 0),
                        vertical = (yDif === 0),
                        diagonal = (xDif - yDif === 0),
                        notSame = !(horizontal && vertical);
                    if ((horizontal || vertical || diagonal) && notSame) {
                        pairs.push({
                            x1: pt1.x,
                            y1: pt1.y,
                            x2: pt2.x,
                            y2: pt2.y
                        });
                    }
                });
            });

            p.noLoop();

        };

        p.draw = function () {

            let workingPairs = Array.from(pairs);
            let vertices = [];

            p.background(255);
            p.noFill();
            p.stroke(0);
            p.strokeWeight(5);
            // p.strokeCap(p.SQUARE);

            let fit = function (a) {
                return margin + a * unit;
            };

            let same = function (p1, p2) {
                if ((p1.x === p2.x) && (p1.y === p2.y)) {
                    return true;
                } else {
                    return false;
                }
            };

            for (let i = 0; i < 40; i++) {
                let index = Math.floor(Math.random() * workingPairs.length);
                let pair = workingPairs[index];
                workingPairs.splice(index, 1);

                if (vertices.length === 0) {
                    vertices.push([{x: pair.x1, y: pair.y1}, {x: pair.x2, y: pair.y2}]);
                }

                vertices.forEach(function (v) {
                    let count = 0;
                    v.forEach(function (vx) {
                        if ((pair.x1 === vx.x) && (pair.y1 === vx.y)) {
                            v.push({x: pair.x2, y: pair.y2});
                            count++;
                            return;
                        } else if ((pair.x2 === vx.x) && (pair.y2 === vx.y)) {
                            v.push({x: pair.x1, y: pair.y1});
                            count++;
                            return;
                        }
                    });
                    if (count === 0) {
                        vertices.push([{x: pair.x1, y: pair.y1}, {x: pair.x2, y: pair.y2}]);
                        return;
                    }
                });

                p.line(fit(pair.x1), fit(pair.y1), fit(pair.x2), fit(pair.y2));
            }

        };

    };

    new p5(p5work, 'ground');

});
