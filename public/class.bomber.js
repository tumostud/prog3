// Bomber
class Bomber {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.energy = 10;

        this.directions = [];
    }

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

    killCell() {
        this.getNewCoordinates();

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

    explode() {
        if (this.energy > 1) this.move();

        else if (this.energy <= 0) this.die();

        else {
            this.energy--;
            var allCells = this.killCell();
            if (allCells.length != 0) {
                // var randomCell = random(allCells);
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
                        matrix[this.y][this.x] = 0;

                        this.x = x;
                        this.y = y;
                    }
                }
            }
        }
    }

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