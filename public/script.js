// Matrix
var matrix = [];

// Side and Character Arrays
var side = 10;
var grassArr = [];
var grassEaterArr = [];
var grassEaterEaterArr = [];
var BombArr = [];
var BombGeneratorArr = [];

// Setup Function
function setup() {
    /*
        - This a n by m matrix.

        - If you want n by n matrix instead of n by m matrix, remove randMatrixRow and randMatrixCol,
        insert var randMatrix = Math.round(random(20, 200)); and set this variable to row and column variables.

        - If you want static-sized matrix, remove randMatrixRow and randMatrixCol variables and just give some numbers to row and column variables
    */
    var randMatrixRow = Math.round(random(20, 200));
    var randMatrixCol = Math.round(random(20, 200));

    var row = randMatrixRow, column = randMatrixCol;

    for (var y = 0; y < row; ++y) {
        matrix[y] = [];

        for (var x = 0; x < column; ++x) {
            matrix[y][x] = Math.round(random(0, 5));
        }
    }

    frameRate(500);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }

            else if (matrix[y][x] == 2) {
                if (grassEaterArr.length <= 20) {
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }
                else matrix[y][x] = 0;
            }

            else if (matrix[y][x] == 3) {
                if (grassEaterEaterArr.length <= 20) {
                    var grEatEater = new GrassEaterEater(x, y);
                    grassEaterEaterArr.push(grEatEater);
                }
                else matrix[y][x] = 0;
            }

            else if (matrix[y][x] == 4) {
                var randBomb = new Bomber(x, y);
                BombArr.push(randBomb);
            }
                
            else if (matrix[y][x] == 5) {
                var randBombGen = new BomberGenerator(x, y);
                BombGeneratorArr.push(randBombGen);
            }
        }
    }
}

// Draw Function
function draw() {
    drawMatrix();
    for (var i in grassArr) {
        grassArr[i].multGrass();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in grassEaterEaterArr) {
        grassEaterEaterArr[i].eat();
    }
    for (var i in BombArr) {
        BombArr[i].explode();
    }
    for (var i in BombGeneratorArr) {
        BombGeneratorArr[i].move();
    }
}

// Draw Matrix Function
function drawMatrix() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }
}