document.addEventListener("DOMContentLoaded", function () {

    (function () {

        let animoticon = function (p) {

            let size = {w: 910, h: 455};
            let colors = {sun: "#FFB901",
                light: "#FFFFFF",
                dark: "#1D1D1B",
                bluescreen: "#0000AA"};

            // let emo1 = 	"( ˘_˘)", emo2 = "(˘_˘ )";
            let emo1 = 	"˘_˘)", emo2 = "(˘_˘", distance = "  ";

            let relations, emoFont, safeFont;

            let getRandomInt = function(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },  getRandomElement = function(list) {
                return list[getRandomInt(0, list.length - 1)];
            };

            p.preload = function () {

                let cartoPath = "/static/media/fonts/cartograph/ttf/",
                    carto = cartoPath + "CartographMonoCFHeavy.ttf",
                    roboPath = "/static/media/fonts/roboto/",
                    roboto = roboPath + "RobotoMono-Bold.ttf",
                    arialPath = "/static/media/fonts/arial/",
                    arial = arialPath + "arial.ttf";

                emoFont = p.loadFont(roboto);
                // emoFont = p.loadFont(carto);
                safeFont = p.loadFont(arial);

                relations = [
                    {sign: "♥", font: safeFont},
                    {sign: "♥", font: safeFont},
                    {sign: "$", font: emoFont},
                    {sign: "!", font: emoFont},
                    {sign: "x", font: emoFont},
                    {sign: "–", font: emoFont},
                    {sign: "¬", font: emoFont},
                    {sign: "→", font: safeFont},
                    {sign: "←", font: safeFont},
                    {sign: "♫", font: safeFont},
                    {sign: "♣", font: safeFont},
                    {sign: "♠", font: safeFont},
                    {sign: "★", font: safeFont},
                    {sign: "⚤", font: safeFont},
                    {sign: "⚣", font: safeFont},
                    {sign: "⚢", font: safeFont}
                ];

            };

            p.setup = function () {
                let canvas = p.createCanvas(size.w, size.h);
                canvas.parent('js-cont');
                p.textAlign(p.CENTER, p.CENTER);
                // p.angleMode(p.DEGREES);
                p.frameRate(8);
            };

            p.draw = function () {
                p.background(colors.dark);

                let pair = emo1 + distance + emo2;
                let emotion = getRandomElement(relations);

                p.fill(colors.light);
                p.textSize(150);
                p.textLeading(6);
                p.textFont(emoFont);
                p.text(pair, size.w/2, size.h/2-20);

                p.fill(colors.sun);
                p.textFont(emotion.font);
                p.text(emotion.sign, size.w/2, size.h/2-20);
            };

        };

        new p5(animoticon, 'nest');

    })();

});