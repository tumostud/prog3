// Grass Eater Eater
class GrassEaterEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 4;
        this.directions = [];
    }

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

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    eat() {
        if (this.energy <= 0) this.die();
        else {
            var grassEatCells = this.chooseCell(2);
            if (grassEatCells.length != 0) {
                this.energy++;
                var randomCell = random(grassEatCells);
                
                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;

                for (var i in grassEaterArr) {
                    if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                if(this.energy >= 5) this.mult();
            }
            else this.move();
        }
    }

    mult() {
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 2;

            grassEaterArr.push(new GrassEaterEater(x,y));

            this.energy = 4;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterEaterArr) {
            if (this.x == grassEaterEaterArr[i].x && this.y == grassEaterEaterArr[i].y) {
                grassEaterEaterArr.splice(i, 1);
                break;
            }
        }
    }
}