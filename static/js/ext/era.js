let generativeEra = function () {

    const w = 940, margin = 10, gMargin = 62, vertMargin = 3,
        shiftAdd = ((w - 2 * margin - 2 * gMargin) / 3),
        shift = {g1: 0, g2: shiftAdd + gMargin, g3: 2 * (shiftAdd + gMargin)},
        col = 9, row = col, dim = col,
        unit = shiftAdd / (col - 1),
        gHeight = (2 * vertMargin) + (unit * (col - 1)),
        vertical = {margin1: vertMargin, margin2: gMargin + gHeight},
        h = (2 * gHeight) + gMargin + 10,
        divName = "js-cont",
        darkColor = "#1D1D1B";

    let randomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    class Board {

        constructor(g) {
            this.g = g;
            this.dg = this.g.append("g");
            this.white = true;
            this.board = [];
            this.boardPoints = [];
            this.pieces = [];
            for (let i = 0; i < 8; i++) {
                this.board[i] = [];
                for (let j = 0; j < 8; j++) {
                    this.board[i][j] = null;
                    this.boardPoints.push({x: i, y: j});
                }
            }
            this.delay = 200;
            this.stepDelay = 0;
        }

        addPiece(piece) {
            this.pieces.push(piece);
        }

        put(piece) {
            this.board[piece.pos.x][piece.pos.y] = piece;
        }

        putOn(piece, pos) {
            this.board[pos.x][pos.y] = piece;
        }

        get(pos) {
            return this.board[pos.x][pos.y];
        }

        removePiece(piece, delay, duration) {
            const index = this.pieces.indexOf(piece);
            if (index > -1) {
                piece.pieceG.transition()
                    .delay(delay)
                    .duration(duration)
                    .style("opacity", 0);
                this.pieces.splice(index, 1);
            }
        }

        clear(pos) {
            this.board[pos.x][pos.y] = null;
        }

        randomStep() {
            let duration = randomInt(200, 400);
            /*
            array cloning options:
            let pcs = JSON.parse(JSON.stringify(this.pieces));
            let pcs = this.pieces.map(a => Object.assign({}, a));
            let pcs = this.pieces.clone();
            let pcs = [...this.pieces];
            */
            let pcs = this.pieces.filter(p => (p.white === this.white));
            let result = null;
            do {
                if (pcs.length === 0) {
                    console.log("endgame");
                    break;
                }
                let pieceIndex = Math.floor(Math.random() * pcs.length);
                let piece = pcs[pieceIndex];
                result = piece.move(this.delay, duration);
                pcs.splice(pieceIndex, 1);
            } while (result === null);
            this.delay += duration + this.stepDelay;
            this.white = !this.white;
        }

        stepPieceWithIndex(index) {
            let duration = randomInt(50, 150);
            let piece = this.pieces[index];
            let result = piece.move(this.delay, duration);
            if (result === null) {
                console.log("deadlock");
            } else {
                this.delay += duration + this.stepDelay;
            }
        }

        drawBoard() {
            this.dg.selectAll("circle")
                .data(this.boardPoints)
                .enter()
                .append("circle")
                .attr("cx", d => mapPoint(d.x))
                .attr("cy", d => mapPoint(d.y))
                .attr("r", 1.2)
                .style("stroke", "none")
                .style("fill", "black");
        }

        static distance(pos1, pos2) {
            const a = pos1.x - pos2.x;
            const b = pos1.y - pos2.y;
            return Math.sqrt((a * a) + (b * b));
        }

        static same(pos1, pos2) {
            return (pos1.x === pos2.x) && (pos1.y === pos2.y);
        }

        has(point) {
            return (point.x >= 0) && (point.y >= 0) && (point.x < 8) && (point.y < 8);
        }

        free(possibleP) {
            let value = true;
            this.pieces.forEach(function (piece) {
                if (Board.same(piece.pos, possibleP)) {
                    value = false;
                }
            });
            return value;
        }

        takeFrom(possibleP, white) {
            let value = null;
            if (this.has(possibleP)) {
                let piece = this.get(possibleP);
                if (piece !== null)
                    if (piece.white !== white)
                        value = piece;
            }
            return value;
        }

    }

    class Piece {

        constructor(board, startingPoint, white) {
            this.board = board;
            this.pos = startingPoint;
            this.white = white;
            this.g = board.g.append("g");
            this.r = 5;
            this.pieceStrokeWidth = 2;
            let oldPurpleBlue = "#7301ff";
            this.pieceStrokeColor = white ? "#FFB901" : "#FF01C6";
            this.lineStrokeWidth = 2.5;
            board.addPiece(this);

            this.possibleG = this.g.append("g");
            this.lineG = this.g.append("g");
        }

        drawPiece() {
        }

        tracePath(line, delay, duration) {
            let path = this.lineG.append("path")
                .attr("d", mapping(line))
                .style("stroke", darkColor)
                .style("stroke-width", this.lineStrokeWidth)
                .style("fill", "none")
                // .style("shape-rendering", "crispEdges")
                .style("stroke-linecap", "round")
                .style("stroke-linejoin", "round");
            const totalLength = path.node().getTotalLength();
            path.attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .delay(delay)
                .duration(duration)
                .ease(d3.easePolyOut)
                .attr("stroke-dashoffset", 0);
        }

        move(delay, duration) {
            const line = [{x: this.pos.x, y: this.pos.y}];
            this.board.clear(this.pos);
            let possibleMatrix = this.createPossibleMatrix();
            return this.chooseAndUpdate(possibleMatrix, line, delay, duration);
        }

        createPossibleMatrix() {
            const currentPoint = {x: this.pos.x, y: this.pos.y, white: this.white};
            let possibleMatrix = [], brd = this.board,
                middle = this.middle, available = this.available;
            this.genericMatrix.forEach(function (gp) {
                let point = {
                    x: gp.y + currentPoint.x - 7,
                    y: gp.x + currentPoint.y - 7
                };
                point = middle(point, gp, currentPoint);
                let result = available(brd.pieces, currentPoint, point);
                point.piece = result.piece;
                if (brd.has(point) && result.avail) {
                    possibleMatrix.push(point);
                }
            });
            return possibleMatrix;
        }

        available(pieces, currentP, possibleP) {
            let value = {avail: true, piece: null};
            const c = Board.distance(currentP, possibleP);
            pieces.forEach(function (piece) {
                if ((Board.same(piece.pos, possibleP)) && (piece.white !== currentP.white)) {
                    // if (Board.same(piece.pos, possibleP)) {
                    value.piece = piece;
                } else if (!Board.same(piece.pos, currentP)) {
                    const a = Board.distance(currentP, piece.pos);
                    const b = Board.distance(possibleP, piece.pos);
                    if (((a + b) - c) < 0.5) {
                        value.avail = false;
                    }
                }
            });
            return value;
        };

        chooseAndUpdate(possibleMatrix, line, delay, duration) {
            if (possibleMatrix.length > 0) {
                this.pos = possibleMatrix[Math.floor(Math.random() * possibleMatrix.length)];
                if (this.pos.piece !== null) {
                    this.board.removePiece(this.pos.piece, delay, duration);
                }
                this.board.putOn(this, this.pos);
                // line.push({x: this.pos.x, y: this.pos.y});
                line = this.linePush(line, this.pos);
                this.drawPiece(this.pos, delay, duration);
                this.tracePath(line, delay, duration);
                return this;
            } else {
                return null;
            }
        }

        middle(p, generalPoint, currentPoint) {
            return p;
        }

        linePush(line, pos) {
            let newLine = [...line];
            newLine.push({x: pos.x, y: pos.y});
            return newLine;
        }

    }

    class Pawn extends Piece {

        constructor(board, startingPoint, white) {
            super(board, startingPoint, white);
            this.pieceG = this.g.selectAll("circle")
                .data([this.pos])
                .enter()
                .append("circle")
                .attr("cx", d => mapPoint(d.x))
                .attr("cy", d => mapPoint(d.y))
                .attr("r", this.r)
                .style("stroke", this.pieceStrokeColor)
                .style("stroke-width", this.pieceStrokeWidth)
                .style("fill", "none");
        }

        drawPiece(pos, delay, duration) {
            this.pieceG.transition()
                .delay(delay)
                .duration(duration)
                .ease(d3.easePolyOut)
                .attr("cx", mapPoint(pos.x))
                .attr("cy", mapPoint(pos.y));
        }

        move(delay, duration) {
            let currentPos = {x: this.pos.x, y: this.pos.y};
            const line = [currentPos];
            this.board.clear(this.pos);

            let possibleMatrix = [];
            const inc = this.white ? -1 : 1;
            const forwardPoint = {x: currentPos.x, y: currentPos.y + inc};
            if ((this.board.has(forwardPoint)) && (this.board.free(forwardPoint))) {
                possibleMatrix.push(forwardPoint);
            }
            const forwLeftPoint = {x: currentPos.x - 1, y: currentPos.y + inc};
            const forwRightPoint = {x: currentPos.x + 1, y: currentPos.y + inc};
            forwLeftPoint.piece = this.board.takeFrom(forwLeftPoint, this.white);
            forwRightPoint.piece = this.board.takeFrom(forwRightPoint, this.white);
            if ((this.board.has(forwLeftPoint)) && (forwLeftPoint.piece !== null)) {
                possibleMatrix.push(forwLeftPoint);
            }
            if ((this.board.has(forwRightPoint)) && (forwRightPoint.piece !== null)) {
                possibleMatrix.push(forwRightPoint);
            }

            return this.chooseAndUpdate(possibleMatrix, line, delay, duration);
        }

    }

    class Queen extends Piece {

        constructor(board, startingPoint, white) {
            super(board, startingPoint, white);
            this.genericMatrix = [];
            for (let i = 0; i < 15; i++) {
                let vertical = {x: 7, y: i},
                    horizontal = {x: i, y: 7},
                    diag1 = {x: i, y: i},
                    diag2 = {x: 14 - i, y: i};
                if (i !== 7) {
                    this.genericMatrix.push(vertical, horizontal, diag1, diag2);
                }
            }
            this.pieceG = this.g.selectAll("line")
                .data(this.pieceShapeData())
                .enter()
                .append("line")
                .attr("x1", d => d.x1)
                .attr("y1", d => d.y1)
                .attr("x2", d => d.x2)
                .attr("y2", d => d.y2)
                .style("stroke", this.pieceStrokeColor)
                .style("stroke-width", this.pieceStrokeWidth)
                .style("fill", "none");
        }

        drawPiece(pos, delay, duration) {
            this.pieceG = this.pieceG.data(this.pieceShapeData());
            this.pieceG.transition()
                .delay(delay)
                .duration(duration)
                .ease(d3.easePolyOut)
                .attr("x1", d => d.x1)
                .attr("y1", d => d.y1)
                .attr("x2", d => d.x2)
                .attr("y2", d => d.y2);
        }

        pieceShapeData() {
            const l = (this.r / 2) + 3;
            const dim = {x: mapPoint(this.pos.x), y: mapPoint(this.pos.y)};
            return [
                {x1: dim.x - l, y1: dim.y - l, x2: dim.x + l, y2: dim.y + l},
                {x1: dim.x - l, y1: dim.y + l, x2: dim.x + l, y2: dim.y - l}
            ];
        }
    }

    class King extends Queen {

        constructor(board, startingPoint, white) {
            super(board, startingPoint, white);
            this.genericMatrix = [];
            for (let i = 6; i < 9; i++) {
                let vertical = {x: 7, y: i},
                    horizontal = {x: i, y: 7},
                    diag1 = {x: i, y: i},
                    diag2 = {x: 14 - i, y: i};
                if (i !== 7) {
                    this.genericMatrix.push(vertical, horizontal, diag1, diag2);
                }
            }
        }

        pieceShapeData() {
            const l = (this.r / 2) + 4;
            const dim = {x: mapPoint(this.pos.x), y: mapPoint(this.pos.y)};
            return [
                {x1: dim.x, y1: dim.y - l, x2: dim.x, y2: dim.y + l},
                {x1: dim.x - l, y1: dim.y, x2: dim.x + l, y2: dim.y}
            ];
        }
    }

    class Knight extends Piece {

        constructor(board, startingPoint, white) {
            super(board, startingPoint, white);
            this.genericMatrix = [
                {x: 5, y: 6, extra: {x: 6, y: 6}},
                {x: 5, y: 8, extra: {x: 6, y: 8}},
                {x: 9, y: 6, extra: {x: 8, y: 6}},
                {x: 9, y: 8, extra: {x: 8, y: 8}},
                {x: 6, y: 5, extra: {x: 6, y: 6}},
                {x: 8, y: 5, extra: {x: 8, y: 6}},
                {x: 6, y: 9, extra: {x: 6, y: 8}},
                {x: 8, y: 9, extra: {x: 8, y: 8}}];

            this.map = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveLinear);

            this.pieceG = this.g.append("g")
                .append("path")
                .attr("d", this.map(this.pieceShapeData()))
                .style("stroke", this.pieceStrokeColor)
                .style("stroke-width", this.pieceStrokeWidth)
                .style("fill", "none");
        }

        available(pieces, currentP, possibleP) {
            let value = {avail: true, piece: null};
            pieces.forEach(function (piece) {
                if ((Board.same(piece.pos, possibleP)) && (piece.white !== currentP.white)) {
                    value.piece = piece;
                } else if ((Board.same(piece.pos, possibleP)) && (piece.white === currentP.white)) {
                    value.avail = false;
                }
                /*else if (!Board.same(piece.pos, currentP)) {
                    const a = Board.distance(currentP, piece.pos);
                    const b = Board.distance(possibleP, piece.pos);
                    if (((a + b) - c) < 0.5) {
                        value.avail = false;
                    }
                }*/
            });
            return value;
        };

        drawPiece(pos, delay, duration) {
            this.pieceG.transition()
                .delay(delay)
                .duration(duration)
                .ease(d3.easePolyOut)
                .attr("d", this.map(this.pieceShapeData()));
        }

        pieceShapeData() {
            const x = this.r * 2 + 2; //(this.r / 2) + 3;
            const h = x * (Math.sqrt(3)/2);
            const p = {x: mapPoint(this.pos.x), y: mapPoint(this.pos.y)};
            return [{x: p.x - x/2, y: p.y + h/2},
                {x: p.x + x/2, y: p.y + h/2},
                {x: p.x, y: p.y - h/2},
                {x: p.x - x/2, y: p.y + h/2}];
        }

        middle(p, generalPoint, currentPoint) {
            let point = p;
            point.extra = {
                x: generalPoint.extra.y + currentPoint.x - 7,
                y: generalPoint.extra.x + currentPoint.y - 7
            };
            return point;
        }

        linePush(line, pos) {
            let newLine = [...line];
            newLine.push({x: pos.extra.x, y: pos.extra.y});
            newLine.push({x: pos.x, y: pos.y});
            return newLine;
        }

    }


    class Rook extends Piece {

        constructor(board, startingPoint, white) {
            super(board, startingPoint, white);
            this.genericMatrix = [];
            for (let i = 0; i < 15; i++) {
                let vertical = {x: 7, y: i},
                    horizontal = {x: i, y: 7};
                if (i !== 7) {
                    this.genericMatrix.push(vertical, horizontal);
                }
            }
            this.pieceG = this.g.selectAll("rect")
                .data(this.pieceShapeData())
                .enter()
                .append("rect")
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("width", d => d.w)
                .attr("height", d => d.h)
                .style("stroke", this.pieceStrokeColor)
                .style("stroke-width", this.pieceStrokeWidth)
                .style("fill", "none");
        }

        drawPiece(pos, delay, duration) {
            this.pieceG = this.pieceG.data(this.pieceShapeData());
            this.pieceG.transition()
                .delay(delay)
                .duration(duration)
                .ease(d3.easePolyOut)
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("width", d => d.w)
                .attr("height", d => d.h);
        }

        pieceShapeData() {
            return [{
                x: mapPoint(this.pos.x) - this.r,
                y: mapPoint(this.pos.y) - this.r,
                w: 2 * this.r,
                h: 2 * this.r
            }];
        }

    }

    class Bishop extends Piece {

        constructor(board, startingPoint, white) {
            super(board, startingPoint, white);
            this.genericMatrix = [];
            for (let i = 0; i < 15; i++) {
                let diag1 = {x: i, y: i},
                    diag2 = {x: 14 - i, y: i};
                if (i !== 7) {
                    this.genericMatrix.push(diag1, diag2);
                }
            }
            this.pieceG = this.g.selectAll("rect")
                .data(this.pieceShapeData())
                .enter()
                .append("rect")
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("width", d => d.w)
                .attr("height", d => d.h)
                .style("stroke", this.pieceStrokeColor)
                .style("stroke-width", this.pieceStrokeWidth)
                .style("fill", "none")
                .attr("transform", d => "rotate(45, " + (d.w / 2 + d.x) + ", " + (d.h / 2 + d.y) + ")");
        }

        drawPiece(pos, delay, duration) {
            this.pieceG = this.pieceG.data(this.pieceShapeData());
            this.pieceG.transition()
                .delay(delay)
                .duration(duration)
                .ease(d3.easePolyOut)
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("width", d => d.w)
                .attr("height", d => d.h)
                .attr("transform", d => "rotate(45, " + (d.w / 2 + d.x) + ", " + (d.h / 2 + d.y) + ")");
        }

        pieceShapeData() {
            return [{
                x: mapPoint(this.pos.x) - this.r,
                y: mapPoint(this.pos.y) - this.r,
                w: 2 * this.r,
                h: 2 * this.r
            }];
        }
    }


    // Mapping functions and making SVG with D3

    let mapping = d3.line()
        .x(d => d.x * unit + margin)
        .y(d => d.y * unit + margin)
        .curve(d3.curveLinear);

    let mapPoint = function (p) {
        return p * unit + margin;
    };

    let svg = d3.select("#" + divName)
        .append("svg")
        .attr("viewBox", "0 0 " + w + " " + h)
        .attr("preserveAspectRatio", "xMinYMin meet");


    // Chess Match Maker

    let nSteps = 130;

    let boardG1 = svg.append("g");
    let chessboard = new Board(boardG1);
    // chessboard.drawBoard();

    // black pieces
    for (let i = 0; i < 8; i++)
        chessboard.put(new Pawn(chessboard, {x: i, y: 1}, false));
    chessboard.put(new Rook(chessboard, {x: 0, y: 0}, false));
    chessboard.put(new Knight(chessboard, {x: 1, y: 0}, false));
    chessboard.put(new Bishop(chessboard, {x: 2, y: 0}, false));
    chessboard.put(new Queen(chessboard, {x: 3, y: 0}, false));
    chessboard.put(new King(chessboard, {x: 4, y: 0}, false));
    chessboard.put(new Bishop(chessboard, {x: 5, y: 0}, false));
    chessboard.put(new Knight(chessboard, {x: 6, y: 0}, false));
    chessboard.put(new Rook(chessboard, {x: 7, y: 0}, false));


    // white pieces
    chessboard.put(new Rook(chessboard, {x: 0, y: 7}, true));
    chessboard.put(new Knight(chessboard, {x: 1, y: 7}, true));
    chessboard.put(new Bishop(chessboard, {x: 2, y: 7}, true));
    chessboard.put(new Queen(chessboard, {x: 3, y: 7}, true));
    chessboard.put(new King(chessboard, {x: 4, y: 7}, true));
    chessboard.put(new Bishop(chessboard, {x: 5, y: 7}, true));
    chessboard.put(new Knight(chessboard, {x: 6, y: 7}, true));
    chessboard.put(new Rook(chessboard, {x: 7, y: 7}, true));
    for (let i = 0; i < 8; i++)
        chessboard.put(new Pawn(chessboard, {x: i, y: 6}, true));

    for (let i = 0; i < nSteps; i++) {
        // chessboard.stepPieceWithIndex(0);
        chessboard.randomStep();
    }

};

document.addEventListener("DOMContentLoaded", generativeEra);

window.onblur = function () {
    window.onfocus = function () {
        // location.reload(true)
        document.getElementById("js-cont").innerHTML = '';
        generativeEra();
    }
};