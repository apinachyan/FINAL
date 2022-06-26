var LivingCreature = require("./livingcreature");

module.exports = class Bomb extends LivingCreature{
    constructor(x,y){
        super(x,y);
        this.directions = [];
        matrix[y][x] = 5;
    }
    getNewCoordinates(){
        this.directions = [
         [this.x - 1, this.y - 1],
         [this.x    , this.y - 1],
         [this.x + 1, this.y - 1],
         [this.x - 1, this.y    ],
         [this.x + 1, this.y    ],
         [this.x - 1, this.y + 1],
         [this.x    , this.y + 1],
         [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch){
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }
}