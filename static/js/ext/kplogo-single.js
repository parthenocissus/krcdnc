document.addEventListener("DOMContentLoaded", function () {

    let dots = [
        [[-6, 78], [26, 45], [39, 82], [20, 68], [66, 72], [53, 50], [87, 40], [82, 63], [39, 60], [27, 23], [55, 38], [63, 21]]
   ];

    let d = 500,
        h = 500,
        adj = (d - h) / 2,
        // r = d / 2 - adj,
        r = d / 2 - adj - 30,
        centerX = d / 2,
        centerY = h / 2,
        k = d / 10,
        generativeTreshold = 0;

    let svg = d3.select("#featured-svg")
        .attr("viewBox", "0 0 " + d + " " + h);

    let randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    let drawIdentity = function () {

        svg.selectAll("*").remove();
        let g = svg.append("g");

        let dt = {},
            reflectX = false, //(Math.random() > 0.5),
            currentDots = [],
            ranLen = randomInt(5, 15),
            secs = 200,
            delay = 400;

        let set = {
            x: function (valueX) {
                if (reflectX) {
                    return d - (valueX / 100) * d;
                } else {
                    return (valueX / 100) * d;
                }
            },
            y: function (valueY) {
                return (valueY / 100) * d - adj;
            }
        };

        let detectIntercept = function (r, cx, cy, x1, x2, y1, y2) {
            let b, c, d,
                v1 = {},
                v2 = {};
            v1.x = x2 - x1;
            v1.y = y2 - y1;
            v2.x = x1 - cx;
            v2.y = y1 - cy;
            b = (v1.x * v2.x + v1.y * v2.y);
            c = 2 * (v1.x * v1.x + v1.y * v1.y);
            b *= -2;
            d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - r * r));
            return !isNaN(d);
        };

        let drawLine = function (x1, y1, x2, y2, del) {
            g.append("line")
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x1)
                .attr("y2", y1)
                .attr("visibility", "hidden")
                .transition()
                .duration(secs)
                .delay(del)
                .attr("visibility", "visible")
                .ease(d3.easeSinOut)
                .attr("x2", x2)
                .attr("y2", y2);
        };

        g.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", r);

        currentDots = dots[0];

        dt.x1 = set.x(currentDots[0][0]);
        dt.y1 = set.y(currentDots[0][1]);

        for (let i = 1; i < currentDots.length; i++) {

            dt.x2 = set.x(currentDots[i][0]);
            dt.y2 = set.y(currentDots[i][1]);

            drawLine(dt.x1, dt.y1, dt.x2, dt.y2, delay);

            if (i < currentDots.length - 1) {
                dt.x1 = dt.x2;
                dt.y1 = dt.y2;
            }
            delay = delay + secs;
        }

        let drawArrowpoints = function (dx1, dx2, dy1, dy2) {

            let c, a, beta, theta, phi;
            let x1 = dx1, x2 = dx2, y1 = dy1, y2 = dy2;
            let angle = Math.PI / 4, len = k;
            let ax1, ax2, ay1, ay2;

            c = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if (Math.abs(x2 - x1) < 1e-6)
                if (y2 < y1)
                    theta = Math.PI / 2;
                else
                    theta = -Math.PI / 2;
            else {
                if (x2 > x1)
                    theta = Math.atan((y1 - y2) / (x2 - x1));
                else
                    theta = Math.atan((y1 - y2) / (x1 - x2));
            }
            a = Math.sqrt(len * len + c * c - 2 * len * c * Math.cos(angle));
            beta = Math.asin(len * Math.sin(angle) / a);

            phi = theta - beta;
            ay1 = y1 - a * Math.sin(phi);
            if (x2 > x1)
                ax1 = x1 + a * Math.cos(phi);
            else
                ax1 = x1 - a * Math.cos(phi);

            phi = theta + beta;
            ay2 = y1 - a * Math.sin(phi);
            if (x2 > x1)
                ax2 = x1 + a * Math.cos(phi);
            else
                ax2 = x1 - a * Math.cos(phi);

            drawLine(dt.x2, dt.y2, ax1, ay1, delay);
            drawLine(dt.x2, dt.y2, ax2, ay2, delay);

        };

        drawArrowpoints(dt.x1, dt.x2, dt.y1, dt.y2);

    };

    drawIdentity();
    setInterval(drawIdentity, 4000);

});