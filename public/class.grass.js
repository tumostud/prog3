// Grass
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.multiply = Math.round(random(0, 7));

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

    multGrass() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var randomCell = random(emptyCells);
        if (this.multiply >= 2 && randomCell != undefined) {
            var x = randomCell[0];
            var y = randomCell[1];
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
            this.multiply = 0;
        }
    }
}