var Bomb = require("./bomb");
var LivingCreature = require("./livingcreature");
var random_func = require('./random');

module.exports = class Airplane extends LivingCreature{
    constructor(y){
        super(0,y);
        this.time = 0;
        matrix[this.y][this.x] = 4;
        PlaneArr.push(this);
        this.posit = PlaneArr.length - 1;
        
    }

last_pos(){
    var last = 0;
    if (this.x == matrix.length - 2){
        let arr1 = this.choose_nextfield(0);
        let arr2 = this.choose_nextfield(1);
        let arr3 = this.choose_nextfield(2);
        let arr4 = this.choose_nextfield(3);
        let arr5 = this.choose_nextfield(6);
        if(arr1.length > 0){
            last = 0;   
        }
        else if(arr2.length > 0){
            last = 1;
        }
        else if(arr3.length > 0){
            last = 2;
        }
        else if(arr4.length > 0){
            last  = 3;
        }
        else if(arr5.length > 0){
            last = 6;
        }
    }
    return last;
}

newPlane (){
    if(this.x == matrix.length - 2){
        var pos = this.last_pos();
    }
    if (this.x == matrix.length){
        var pos_x = this.x - 1;
        matrix[this.y][pos_x] = pos;
        PlaneArr.splice(this.posit,1);
        // var random_y = Math.round(Math.random() * matrix.length - 1);
        var random_y = random_func(matrix.length);
        var NewPlane = new Airplane(random_y);
        } 
}

choose_nextfield(ch){
    this.directions[0] = [this.x + 1, this.y];
    return this.chooseCell(ch);
}

move (){
    let arr2 = this.choose_nextfield(1);
    let arr3 = this.choose_nextfield(2);
    let arr4 = this.choose_nextfield(3);
    let arr5 = this.choose_nextfield(6);
    if(arr2.length > 0){
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
    else{
        matrix[this.y][this.x] = 0;
    }
    this.x++;
    matrix[this.y][this.x] = 4;  
}

removing(num,bombobj,globalArr){
    var arr = bombobj.chooseCell(num)
    if(arr.length > 0){
        for (var i in arr){
            var x = arr[i][0];
            var y = arr[i][1];
            matrix[y][x] = 0;
            for (var i in globalArr) {
                if (x == globalArr[i].x && y == globalArr[i].y) {
                globalArr.splice(i, 1);
                break;
                }
            }
        }
    }
}

bomb (){
    if (this.x >= matrix[0].length / 2){
        var bomb_x = matrix.length / 2  - 1;
        var boomb = new Bomb(bomb_x,this.y);
        bombArr.push(boomb);
        this.time++;
        if (this.time >= 6){
        matrix[this.y][bomb_x] = 0;
        this.removing(1,boomb,grassArr);
        this.removing(2,boomb,grassEaterArr);
        this.removing(3,boomb,WildAnimalArr);
        this.removing(6,boomb,HumanArr);
        bombArr.pop();
        }
    }      
}
start(){
    this.move();

    if (this.x >= matrix[0].length / 2){
        this.bomb();
    }
    if (this.x === matrix.length - 1 || this.x == matrix.length){
        this.newPlane();
    }
}   
}