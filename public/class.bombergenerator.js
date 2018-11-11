// Bomber Generator
class BomberGenerator {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.energy = 40;

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

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        if (this.energy <= 0) this.die();

        else {
            this.energy--;
            var emptyCells = this.chooseCell(0);
            if (emptyCells.length != 0) {
                var randomCell = random(emptyCells);

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }

            if (this.energy > 0 && this.energy <= 30 ) {
                if (this.energy % 5 == 0) this.mult();
            }
        }
    }

    mult() {
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 4;

            BombArr.push(new Bomber(x,y));

            this.energy--;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in BombGeneratorArr) {
            if (this.x == BombGeneratorArr[i].x && this.y == BombGeneratorArr[i].y) {
                BombGeneratorArr.splice(i, 1);
                break;
            }
        }
    }
}