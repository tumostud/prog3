// Bomber Class
class Bomber extends LivingCreature {
    // Constructor
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
        this.directions = [];
    }

    // Wider Direction Radius
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    // Narrower Direction Radius
    getNewSmallCoordinates() {
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

    // Choosing Cells for move() Method 
    chooseCell(character) {
        if (weather == 'winter' || weather == 'spring') this.getNewSmallCoordinates(); // On Winter and Spring the Bomber will Move One Step
        else this.getNewCoordinates(); // On Summer and Autumn the Bomber will Move Two Steps
        return super.chooseCell(character);
    }

    // Choosing Cells for explode() Method
    killCell() {
        if (weather == 'winter' || weather == 'spring') this.getNewSmallCoordinates(); // On Winter and Spring the explosion radius will be small
        else this.getNewCoordinates(); // On Summer and Autumn the explosion radius will be bigger

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }

    // Move Method
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    // Explode Method
    explode() {
        if (this.energy > 1) this.move();

        else if (this.energy <= 0) this.die();

        else {
            this.energy--;
            var allCells = this.killCell();
            if (allCells.length != 0) {
                for (var i in allCells) {
                    var x = allCells[i][0];
                    var y = allCells[i][1];

                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                        if (matrix[y][x] == 0) matrix[y][x] = 0;
                        else if (matrix[y][x] == 1) {
                            matrix[y][x] == 0;
                            for (var i in grassArr) {
                                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                                    grassArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 2) {
                            matrix[y][x] == 0;
                            for (var i in grassEaterArr) {
                                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                                    grassEaterArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 3) {
                            matrix[y][x] == 0;
                            for (var i in grassEaterEaterArr) {
                                if (this.x == grassEaterEaterArr[i].x && this.y == grassEaterEaterArr[i].y) {
                                    grassEaterEaterArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 5) {
                            matrix[y][x] == 0;
                            for (var i in BombGeneratorArr) {
                                if (this.x == BombGeneratorArr[i].x && this.y == BombGeneratorArr[i].y) {
                                    BombGeneratorArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 6) {
                            matrix[y][x] == 0;
                            for (var i in BombDestroyerArr) {
                                if (this.x == BombDestroyerArr[i].x && this.y == BombDestroyerArr[i].y) {
                                    BombDestroyerArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        matrix[this.y][this.x] = 0;

                        this.x = x;
                        this.y = y;
                    }
                }
            }
        }
    }

    // Die Method
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in BombArr) {
            if (this.x == BombArr[i].x && this.y == BombArr[i].y) {
                BombArr.splice(i, 1);
                break;
            }
        }
    }
}