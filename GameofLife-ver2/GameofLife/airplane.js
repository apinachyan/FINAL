Bomb = require("./bomb");

module.exports = class Airplane {
    constructor(y){
        this.directions = [];
        this.y = y;
        this.x = 0;
        this.time = 0;
        matrix[this.y][this.x] = 4;
        PlaneArr.push(this);
        
    }

newPlane (){
    if (this.x >= matrix.length - 1){
        matrix[this.y][this.x] = 0;
        for (var i in PlaneArr){
            if (this.y == PlaneArr[i].y){
                PlaneArr.splice(i,1);
            }
        }
            var random_y = Math.round(Math.random() * matrix.length - 1);
            var NewPlane = new Airplane(random_y);
        } 
}

choose_nextfield(ch){
    this.directions[0] = [this.x + 1, this.y];
    var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found; 
}

move (){
    let arr1 = this.choose_nextfield(0);
    let arr2 = this.choose_nextfield(1);
    let arr3 = this.choose_nextfield(2);
    let arr4 = this.choose_nextfield(3);
    let arr5 = this.choose_nextfield(6);
    if(arr1.length > 0){
        matrix[this.y][this.x] = 0;   
    }
    else if(arr2.length > 0){
        matrix[this.y][this.x] = 1;
    }
    else if(arr3.length > 0){
        matrix[this.y][this.x] = 2;
    }
    else if(arr4.length > 0){
        matrix[this.y][this.x] = 3;
    }
    else if(arr5.length > 0){
        matrix[this.y][this.x] = 6;
    }
    this.x++;
    matrix[this.y][this.x] = 4;  
}
    

bomb (){
    if (this.x >= matrix[0].length / 2){
        var bomb_x = matrix.length / 2  - 1;
        var boomb = new Bomb(bomb_x,this.y);
        this.time++;
        if (this.time >= 6){
        matrix[this.y][bomb_x] = 0; 
        var CellArray = boomb.chooseCell(1);
        var EaterArray = boomb.chooseCell(2);
        var AnimalArray = boomb.chooseCell(3);
        var HumanArray = boomb.chooseCell(6);
        for (var i in CellArray){
            var x = CellArray[i][0];
            var y = CellArray[i][1];
            matrix[y][x] = 0;
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                grassArr.splice(i, 1);
                    break;
                }
            }
          }
          if(EaterArray.length > 0){
            for (var i in EaterArray){
                var x = EaterArray[i][0];
                var y = EaterArray[i][1];
                matrix[y][x] = 0;
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                        break;
                    }
                }
              } 
          }
          if(AnimalArray.length > 0){
            for (var i in AnimalArray){
                var x = AnimalArray[i][0];
                var y = AnimalArray[i][1];
                matrix[y][x] = 0;
                for (var i in WildAnimalArr) {
                    if (x == WildAnimalArr[i].x && y == WildAnimalArr[i].y) {
                    WildAnimalArr.splice(i, 1);
                        break;
                    }
                }
              } 
          }
          if(HumanArray.length > 0){
            for (var i in HumanArray){
                var x = HumanArray[i][0];
                var y = HumanArray[i][1];
                matrix[y][x] = 0;
                for (var i in HumanArr) {
                    if (x == HumanArr[i].x && y == HumanArr[i].y) {
                    HumanArr.splice(i, 1);
                        break;
                    }
                }
              } 
          }
        }
    }
        
}
start(){
    this.move();

    if (this.x >= matrix[0].length / 2){
        this.bomb();
    }
    if (this.x >= matrix.length - 1){
        this.newPlane();
    }
}   
}

// class Bomb extends LivingCreature{
//     constructor(x,y){
//         super(x,y);
//         this.directions = [];
//         matrix[y][x] = 5;
//     }
//     getNewCoordinates(){
//         this.directions = [
//          [this.x - 1, this.y - 1],
//          [this.x    , this.y - 1],
//          [this.x + 1, this.y - 1],
//          [this.x - 1, this.y    ],
//          [this.x + 1, this.y    ],
//          [this.x - 1, this.y + 1],
//          [this.x    , this.y + 1],
//          [this.x + 1, this.y + 1]
//         ];
//     }
//     chooseCell(ch){
//         this.getNewCoordinates();
//         return super.chooseCell(ch);
//     }
// }