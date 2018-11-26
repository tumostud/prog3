// Matrix
var matrix = [];

// Side and Character Arrays
var side = 10;
var grassArr = [];
var grassEaterArr = [];
var grassEaterEaterArr = [];
var BombArr = [];
var BombGeneratorArr = [];
var BombDestroyerArr = [];

var days = 0;
var weather = "winter";

var frameSec = 0;

var cnv;

// Setup Function
function setup() {
    /*
        - This is a n by m matrix.

        - If you want n by n matrix instead of n by m matrix, remove randMatrixRow and randMatrixCol,
        insert var randMatrix = Math.round(random(20, 200)); and set this variable to row and column variables.

        - If you want static-sized matrix, remove randMatrixRow and randMatrixCol variables and just give some numbers to row and column variables
    */
    var randMatrixRow = Math.round(random(20, 200));
    var randMatrixCol = Math.round(random(20, 200));

    // var row = randMatrixRow, column = randMatrixCol;
    var row = 50, column = 50;

    for (var y = 0; y < row; ++y) {
        matrix[y] = [];

        for (var x = 0; x < column; ++x) {
            matrix[y][x] = Math.round(random(0, 6));
        }
    }

    frameRate(500);
    cnv = createCanvas(matrix[0].length * side, matrix.length * side);
    cnv.mouseClicked(getCoords);
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

            else if (matrix[y][x] == 6) {
                if (BombDestroyerArr.length <= 20) {
                    var bombDest = new BomberDestroyer(x, y);
                    BombDestroyerArr.push(bombDest);
                }
                else matrix[y][x] = 0;
            }
        }
    }
    /* console.log(grassArr);
    console.log(grassEaterArr);
    console.log(grassEaterEaterArr); */
}

// Draw Function
function draw() {
    drawMatrix();
    days++
    frameSec++;
    if(days <= 10){
        weather = "winter";
        document.body.style.background = '#f7f7f7';
        document.getElementById('weather').innerText = "Winter";
    }
    else if(days > 10 && days < 20){
        weather = "spring";
        document.body.style.background = 'lightgreen';
        document.getElementById('weather').innerText = "Spring";
        document.body.style.transition = 'all .7s ease-in';
        document.getElementById('weather').style.transition = 'all .7s ease-in';
    }
    else if(days > 20 && days < 30){
        weather = "summer";
        document.body.style.background = 'lightblue';
        document.getElementById('weather').innerText = "Summer";
        document.body.style.transition = 'all .7s ease-in';
        document.getElementById('weather').style.transition = 'all .7s ease-in';
    }
    else if(days > 30 && days < 40){
        weather = "autumn";
        document.body.style.background = 'orange';
        document.getElementById('weather').innerText = "Autumn";
        document.body.style.transition = 'all .7s ease-in';
        document.getElementById('weather').style.transition = 'all .7s ease-in';
    }
    else if (days == 40){
        days = 0;
    }

    if (frameSec == 11) {
        //statistics();
        frameSec = 0;
    }
    
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
    for (var i in BombDestroyerArr) {
        BombDestroyerArr[i].destroy();
        // console.log(BombDestroyerArr[i].energy);
    }
}

function mouseClicked() {}
function getCoords() {
    var i, j;
    console.log("Mouse clicked on coordinates x: " + mouseX + " and y: " + mouseY);
    i = mouseX / 10;
    i = Math.floor(i);
    j = mouseY / 10;
    j = Math.floor(j);
    //console.log("i: " + i + " , j: " + j);
    //console.log(matrix[j][i]);
    if (matrix[j][i] == 2) {
        //console.log('Grass eater arr length: ' + grassEaterArr.length);
        //console.log('Grass eater eater arr length: ' + grassEaterEaterArr.length);
        for (var k = 0; k < grassEaterArr.length; k++) {
            if (grassEaterArr[k]['x'] == i && grassEaterArr[k]['y'] == j) {
                //console.log('Clicked grass eater object:');
                //console.log(grassEaterArr[k]);
                //console.log('Clicked grass eater object\'s y coord: ' + grassEaterArr[k]['y']);
                //console.log('Clicked grass eater object\'s x coord: ' + grassEaterArr[k]['x']);
                grassEaterArr[k].die();
                matrix[j][i] = 3;
                var grEatEater = new GrassEaterEater(i, j);
                grassEaterEaterArr.push(grEatEater);
            }
        }
        console.log('It\'s yellow!');
        //console.log('Grass eater arr length: ' + grassEaterArr.length);
        //console.log('Grass eater eater arr length: ' + grassEaterEaterArr.length);
    }
    else if (matrix[j][i] == 3) {
        for (var k = 0; k < grassEaterEaterArr.length; k++) {
            if (grassEaterEaterArr[k]['x'] == i && grassEaterEaterArr[k]['y'] == j) {
                grassEaterEaterArr[k].die();
                matrix[j][i] = 2;
                var grEater = new GrassEater(i, j);
                grassEaterArr.push(grEater);
            }
        }
        console.log('It\'s red!');
    }
}

/*
1. Get mouse click X
2. Get the coordinates of the clicked square X
3. Check what character is in the square X
4. Work with the character inside that square X
  4.1 Remove the character X
  4.2 Add new character 
  4.3 Update both arrays of characters X
*/

// Draw Matrix Function
function drawMatrix() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather == 'winter') { fill('white'); } // On Winter grass turns to white
                else if (weather == 'autumn') { fill('#e0bb28') } //On Autumn grass turns to orange-yellow-ish color
                else { fill("green"); } // On Spring and Summer grass is green
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 0) {
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
            else if (matrix[y][x] == 6) {
                fill("#09eded");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

// Statistics

function statistics() {
    // var socket = io();
    console.log('Works');
    console.log(grassArr.length);
    console.log(grassEaterArr.length);
    console.log(grassEaterEaterArr.length);
    console.log(BombArr.length);
    console.log(BombGeneratorArr.length);
    console.log(BombDestroyerArr.length);
    console.log(weather);
}







// Tasks
// 1. Weather (Done)
// 2. Gender 
// 3. Unique Situatuion (Done)
// 4. New Characters (6 or more) (Done) (6 Characters)
// 5. Statistics (!!X!!)
// 6. Diagrams (Not necessary)