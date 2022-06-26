var LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature{
    constructor(x,y){
        super(x,y);
        matrix[y][x] = 1;
        grassArr.push(this);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        if (emptyCells.length > 0){
        var rand = Math.round(Math.random() * (emptyCells.length - 1));
        var x = emptyCells[rand][0];
        var y = emptyCells[rand][1];
        matrix[y][x] = 1;
        new Grass(x,y);
        }
    }
}