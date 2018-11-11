// Grass
class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.multiply = Math.round(random(0, 7));
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