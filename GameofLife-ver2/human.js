var LivingCreature = require("./livingcreature");

module.exports = class Human extends LivingCreature{
    constructor(x,y){
        super(x,y)
        this.directions = [];
        this.energy = 14;
        matrix[y][x] = 6;
        HumanArr.push(this);
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


    getNewBiggerCoordinates(){
        this.directions = [
         [this.x - 2, this.y - 2],
         [this.x - 1, this.y - 2],
         [this.x,     this.y - 2],
         [this.x + 1, this.y - 2],
         [this.x + 2, this.y - 2],
         [this.x - 2, this.y - 1],
         [this.x + 2, this.y - 1],
         [this.x - 2, this.y    ],
         [this.x + 2, this.y    ],
         [this.x - 2, this.y + 1],
         [this.x + 2, this.y + 1],
         [this.x - 2, this.y + 2],
         [this.x - 1, this.y + 2],
         [this.x,     this.y + 2],
         [this.x + 1, this.y + 2],
         [this.x + 2, this.y + 2],
        ];
     }
     chooseCell(ch){
         this.getNewCoordinates();
         return super.chooseCell(ch);
     }
     chooseBiggerCell(character){
        this.getNewBiggerCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move () {
        var emptyC = this.chooseCell(0);
        var randIndex = Math.round(Math.random() * (emptyC.length - 1));
        var NewX = emptyC[randIndex][0];
        var NewY = emptyC[randIndex][1];
        matrix[this.y][this.x] = 0;
        matrix[NewY][NewX] = 6;
        this.x = NewX;
        this.y = NewY;
        if (weath == 'winter'){
            this.energy -= 3;
        }
        else if (weath == 'autumn'){
            this.energy -= 2;
        }
        else {
            this.energy--;
        }

    }

runaway (){
    var y = this.y;
    var x = this.x;
        var arr = this.chooseBiggerCell(3);
        if (arr.length > 0){ 
            for (let i = 0; i < arr.length; i++){
                if (this.y > arr[i][1] && this.y < matrix.length){
                    y = y + 1;
                }
                else if (this.y < arr[i][1] && this.y > 0){
                    y = y - 1;
                }
        }
        for (let i = 0; i < arr.length; i++){
                if (this.x > arr[i][0] && this.x < matrix.length - 1){
                    x = x + 1;
                }
                else if (this.x < arr[i][0] && this.x > 0){
                    x = x - 1;
                }  
        }
    }
    matrix[this.y][this.x] = 0;
    matrix[y][x] = 6;
    this.x = x;
    this.y = y;
    if (weath == 'winter'){
        this.energy -= 3;
    }
    else if (weath == 'autumn'){
        this.energy -= 2;
    }
    else {
        this.energy--;
    }
}
eat () {
        var eatArr = this.chooseCell(2);
        var ran = Math.round(Math.random() * (eatArr.length - 1));
        var x_eat = eatArr[ran][0];
        var y_eat = eatArr[ran][1];
        matrix[this.y][this.x] = 0;
        matrix[y_eat][x_eat] = 6;
        this.x = x_eat;
        this.y = y_eat;
        this.energy += 3;
        for (var i in grassEaterArr) {
            if (x_eat == grassEaterArr[i].x && y_eat == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
                break;
            }
        }
}

    multi(){
        if ((this.energy >= 20 && (weath == 'spring' || weath == 'summer')) || (this.energy >= 25 && (weath == 'winter' || weath == 'autumn'))){
            var multiCell = this.chooseCell(0);
            if (multiCell.length > 0){
                var rd = Math.round(Math.random() * (multiCell.length - 1));
                var x_mul = multiCell[rd][0];
                var y_mul = multiCell[rd][1];
                var NewHuman = new Human(x_mul,y_mul);
                HumanArr.push(NewHuman);
                if (weath == 'winter'){
                    this.energy = 7;
                }
                else if (weath == 'autumn'){
                    this.energy = 8;
                }
                else {
                    this.energy = 11;
                }
            }
            
        }
    }
    
    die (){
        if (this.energy <= 0){
            matrix[this.y][this.x] = 0;
            for (var i in HumanArr) {
                if (this.x == HumanArr[i].x && this.y == HumanArr[i].y) {
                    HumanArr.splice(i, 1);
                    break;
                }
            }  
        }
    }

    start (){
        if(weath == 'winter'){
            this.energy -= 2;
        }
        else if (weath == 'autumn'){
            this.energy -= 1;
        }
        if (this.chooseCell(2).length > 0){
            this.eat();
        }
        else if (this.chooseCell(0).length > 0){
            this.move();
        }
        if (this.chooseBiggerCell(3).length > 0){
            this.runaway();
        }
        if ((this.energy >= 20 && (weath == 'spring' || weath == 'summer')) || (this.energy >= 25 && (weath == 'winter' || weath == 'autumn'))){
            this.multi();
        }
        if (this.energy <= 0){
            this.die();
        }
}
}