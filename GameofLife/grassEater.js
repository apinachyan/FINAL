var LivingCreature = require("./livingcreature");

module.exports = class GrassEater extends LivingCreature{
    constructor(x,y){
        super(x,y);
        this.directions = [];
        this.energy = 8;
        matrix[y][x] = 2;
        grassEaterArr.push(this);
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
     
     move () {
         var emptyC = this.chooseCell(0);
         var randIndex = Math.round(Math.random() * (emptyC.length - 1));
         var NewX = emptyC[randIndex][0];
         var NewY = emptyC[randIndex][1];
         matrix[this.y][this.x] = 0;
         matrix[NewY][NewX] = 2;
         this.x = NewX;
         this.y = NewY;
         this.energy--;
     }
     eat () {
         var eatArr = this.chooseCell(1);
         var ran = Math.round(Math.random() * (eatArr.length - 1));
         var x_eat = eatArr[ran][0];
         var y_eat = eatArr[ran][1];
         matrix[this.y][this.x] = 0;
         matrix[y_eat][x_eat] = 2;
         this.x = x_eat;
         this.y = y_eat;
         this.energy += 3;
         for (var i in grassArr) {
             if (x_eat == grassArr[i].x && y_eat == grassArr[i].y) {
                 grassArr.splice(i, 1);
                 break;
             }
         }
     }
     
     die (){
         if (this.energy <= 0){
             matrix[this.y][this.x] = 0;
             for (var i in grassEaterArr) {
                 if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                     grassEaterArr.splice(i, 1);
                     break;
                 }
             }  
         }
     }
     multi(){
         if (this.energy >= 20){
             var multiCell = this.chooseCell(0);
             if (multiCell.length > 0){
                 var rd = Math.round(Math.random() * (multiCell.length - 1));
                 var x_mul = multiCell[rd][0];
                 var y_mul = multiCell[rd][1];
                 var newEater = new GrassEater(x_mul,y_mul);
                 grassEaterArr.push(newEater);
                 this.energy = 11;
             }
             
         }
     }
     
     start (){
         if (this.chooseCell(1).length > 0){
             this.eat();
         }
          else if (this.chooseCell(0).length > 0){
             this.move();
         }
         if (this.energy >= 20){
             
             this.multi();
             
         }
         if (this.energy <= 0){
             this.die();
         }
     }
}