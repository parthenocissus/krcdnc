let birdFont, numFont, colors, colorBase,
    matrix, size, margin,
    mtrxWidth, mtrxHeight,
    x0, y0, xMargin0, xStep, yStep;

function preload() {

    size = {
        w: window.innerWidth - 25, // window.innerWidth * 0.75,
        h: window.innerHeight
    };

    let fontsPath = "/static/media/fonts/roboto/";
    let roboLight = fontsPath + "RobotoMono-Light.ttf",
        roboMedium = fontsPath + "RobotoMono-Medium.ttf",
        roboRegular = fontsPath + "RobotoMono-Regular.ttf",
        roboBold = fontsPath + "RobotoMono-Bold.ttf",
        cartoMedium = fontsPath + "CartographMonoCFMedium.ttf",
        cartoRegular = fontsPath + "CartographMonoCFRegular.ttf";

    birdFont = loadFont(roboBold);
    numFont = loadFont(roboRegular);
    matrix = [];
    colors = [];
}

function setup() {

    let canvas = createCanvas(size.w, size.h);
    canvas.parent('nest');

    fill("white");
    angleMode(DEGREES);
    textAlign(CENTER);

    colorBase = color(120);
    colors[0] = "#fccb4e";
    colors[1] = "#b44c18";
    colors[2] = "#f3b82f";
    colors[3] = "#c48e2a";
    colors[4] = "#e26204";

    // colors[5] = "#c48e2a";
    //
    // colors[6] = "#f3b82f";
    // colors[7] = "#f3b82f";
    //
    // for (let i = 8; i < 50; i++) {
    //     colors[i] = "#fccb4e";
    // }

    xStep = 14;
    yStep = 21;
    x0 = 100;
    y0 = 20;
    xMargin0 = 28;

    // inverse!
    mtrxWidth = (size.h - x0 - y0) / xStep;
    mtrxHeight = (size.w - y0 - 10) / yStep;

    fillMatrix();

    frameRate(2);
    //noLoop();
}

function fillMatrix() {
    margin = {i1: 0, i2: 0, j1: 0, j2: 0};
    for (let i = margin.i1; i < mtrxWidth - margin.i2; i++) {
        for (let j = margin.j2; j < mtrxHeight - margin.j2; j++) {
            let dot = {
                i: i, j: j,
                // inverse
                x: (x0 + i * xStep) - size.h / 2,
                y: (y0 + j * yStep) - size.w / 2
            };
            matrix.push(dot);
        }
    }
}

function draw() {

    fillMatrix();
    // let flockSize = getRandomInt(1, matrix.length * 0.5);
    // let flockSize = getGaussianRandomInt(1, 40);
    let flockSize = getGaussianRandomInt(1, matrix.length * 0.5, 3);

    // background(0);
    background(colors[0]);

    translate(width / 2, height / 2);
    push();
    rotate(90);

    fill(colors[1]);
    textFont(numFont);
    textSize(13);
    textAlign(RIGHT, CENTER);
    for (let i = 0; i < mtrxHeight; i++) {
        let y = y0 + (i * yStep);
        // inverse
        text(i + 1, xMargin0 - size.h / 2, y - size.w / 2);
    }

    textFont(birdFont);
    textSize(16);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < flockSize; i++) {

        let pos;
        do {
            let ri = gaussianRandomInt(margin.i1, mtrxWidth - margin.i2),
                rj = gaussianRandomInt(margin.j1, mtrxHeight - margin.j2);
            try {
                pos = matrix.find(x => ((x.i === ri) & (x.j === rj)));
                if (pos) break;
            } catch (err) {
            }
        } while (true);

        let symb = (random() > 0.5) ? "{" : "}";
        fill(colors[getRandomInt(1, colors.length-1)]);
        text(symb, pos.x, pos.y);
        matrix.splice(matrix.indexOf(pos), 1);

    }
    matrix = [];
    pop();
}

function getGaussianRandomInt(min, max, skew = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return Math.floor(num);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gaussianRand() {
    let rand = 0, n = 3;
    for (var i = 0; i < n; i += 1) {
        rand += Math.random();
    }
    return rand / n;
}

function gaussianRandomInt(start, end) {
    return Math.floor(start + gaussianRand() * (end - start + 1));
}