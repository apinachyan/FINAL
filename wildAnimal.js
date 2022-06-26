var LivingCreature = require("./livingcreature");

module.exports = class WildAnimal extends LivingCreature{
    constructor(x,y){
        super(x,y);
        this.energy = 15;
        this.directions = [];
        matrix[y][x] = 3;
        WildAnimalArr.push(this);
        this.pos = WildAnimalArr.length - 1;
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
        matrix[NewY][NewX] = 3;
        this.x = NewX;
        this.y = NewY;
        if(weath == 'winter'){
            this.energy -= 4;
        }
        else if(weath == 'autumn'){
            this.energy -= 3;
        }
        else{
            this.energy--;
        }
    }

    eat () {
        var eatArr = this.chooseCell(2);
        var ran = Math.round(Math.random() * (eatArr.length - 1));
        var x_eat = eatArr[ran][0];
        var y_eat = eatArr[ran][1];
        matrix[this.y][this.x] = 0;
        matrix[y_eat][x_eat] = 3;
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

    eatHuman () {
        var eatArr = this.chooseCell(6);
        var ran = Math.round(Math.random() * (eatArr.length - 1));
        var x_eat = eatArr[ran][0];
        var y_eat = eatArr[ran][1];
        matrix[this.y][this.x] = 0;
        matrix[y_eat][x_eat] = 3;
        this.x = x_eat;
        this.y = y_eat;
        this.energy += 3;
        for (var i in HumanArr) {
            if (x_eat == HumanArr[i].x && y_eat == HumanArr[i].y) {
                HumanArr.splice(i, 1);
                break;
            }
        }
    }


    multi(){
        if ((this.energy >= 20 && (weath == 'spring' || weath == 'autumn')) || (this.energy >= 26 && (weath == 'winter' || weath == 'summer'))){
            var multiCell = this.chooseCell(0);
            if (multiCell.length > 0){
                var rd = Math.round(Math.random() * (multiCell.length - 1));
                var x_mul = multiCell[rd][0];
                var y_mul = multiCell[rd][1];
                var newEater = new  WildAnimal(x_mul,y_mul);
                WildAnimalArr.push(newEater);
                this.energy = 11;
            }
            
        }
    }
    
    die (){
        if (this.energy <= 0){
            matrix[this.y][this.x] = 0;
            for (var i in WildAnimalArr) {
                if (this.x == WildAnimalArr[i].x && this.y == WildAnimalArr[i].y) {
                    WildAnimalArr.splice(i, 1);
                    break;
                }
            }  
        }
    }

    start (){
        if(weath == 'winter'){
            this.energy -= 3;
        }
        else if (weath == 'summer'){
            this.energy -= 2;
        }
        if (this.chooseCell(2).length > 0){
            this.eat();
        }
         else if (this.chooseCell(0).length > 0){
            this.move();
        }
        if (this.chooseCell(6).length > 0){
            this.eatHuman();
        }
        if ((this.energy >= 20 && (weath == 'spring' || weath == 'autumn')) || (this.energy >= 26 && (weath == 'winter' || weath == 'summer'))){
            this.multi();
        }
        if (this.energy <= 0){
            this.die();
        }
    }
}