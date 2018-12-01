// Grass Eater Class
class GrassEater extends LivingCreature {
    // Constructor
    constructor(x, y) {
        super(x, y);
        this.gender = Math.round(Math.random()); // 0 - Female, 1 - Male
        this.energy = Math.round(random(10, 20));
        this.directions = [];
    }

    // Direction Radius
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    // Choose Cell Method
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    // Eat Method
    eat() {
        var grassCells = this.chooseCell(1);
        if (grassCells.length != 0) {
            this.energy++;
            var randomCell = random(grassCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 2) this.mult();
        }
        else this.move();
    }

    // Move Method
    move() {
        if (this.energy <= 0) this.die();
        else {
            this.energy--;
            var emptyCells = this.chooseCell(0);
            if (emptyCells.length != 0) {
                var randomCell = random(emptyCells);

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }
    }

    // Custom Mult Method (With Genders, Broken!)
    /*
    mult() {
        if (this.gender == 0) {
            this.energy--;
            var sameCell = this.chooseCell(2);
            if (sameCell.length != 0) {
                var randomSameCell = random(sameCell);
                // console.log(sameCell.length);
                //console.log(sameCell);
                // console.log(this.gender);

                var x = randomSameCell[0];
                var y = randomSameCell[1];

                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y && grassEaterArr[i].gender == 1) {
                        //console.log("Gender: " + grassEaterArr[i].gender);
                        //console.log("X: " + grassEaterArr[i].x);
                        //console.log("Y: " + grassEaterArr[i].y);
                        var emptyCells = this.chooseCell(0);
                        if (emptyCells.length != 0) {
                            var randomCell = random(emptyCells);
                            // console.log(emptyCells.length);
                            //console.log(emptyCells);
                            // console.log(this.gender);

                            var a = randomCell[0];
                            var b = randomCell[1];
                            matrix[b][a] = 2;
            
                            grassEaterArr.push(new GrassEater(a, b));
                            console.log('Done');
                        }
                    }
                }   
            }
            //if (weather == 'winter') this.energy = 4; // On Winter multiply so little
            //else if (weather == 'summer') this.energy = 8; // On Summer multiply a bit more
            //else this.energy = 6; // On Spring and Autumn multiply regularly
            this.energy = 10;
        }

        else {
            this.move();
        }
    }
    */

    // Normal Mult Method (Without Genders)
    mult() {
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);
            //console.log(emptyCells.length);
            //console.log(this.gender);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 2;

            grassEaterArr.push(new GrassEater(x,y));
            //console.log('Done');

            if (weather == 'winter') this.energy = 2; // On Winter multiply so little
            else if (weather == 'summer') this.energy = 3; // On Summer multiply a bit more
            else this.energy = 4; // On Spring and Autumn multiply regularly
        }
    }
    
    // Die Method
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}