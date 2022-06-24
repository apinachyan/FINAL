var Grass = require("./grass");
var LivingCreature = require("./livingcreature");

module.exports = class Water extends LivingCreature{
    constructor(len,hgt){
        super(0,0);
        this.hgt = hgt;
        this.len = len;
        this.start = 0;
        this.end = 0;
        this.time = 0;
        this.directions = [];
        waterArr.push(this);
    }
    getNewCoordinates(){
        for (var i = 0;i < this.len;i++){
            this.directions.push([i,this.start]);
        }
    }
    chooseCell(ch){
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }
    removing(num,globalArr){
        var arr = this.chooseCell(num)
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
    flow(){
        this.removing(1,grassArr);
        this.removing(2,grassEaterArr);
        this.removing(3,WildAnimalArr);
        this.removing(4,PlaneArr);
        this.removing(5,bombArr);
        this.removing(6,HumanArr);
        for (var i = 0;i < this.len;i++){
            matrix[this.start][i] = 7;
        }
        this.start += 1;
    }
    ending(){
        for (var i = 0;i < this.len;i++){
            var grass_object = new Grass(i,this.end);
            grassArr.push(grass_object);
            // matrix[this.end][i] = 1;
        }
        this.end += 1;
    }
    starting(){
        if(this.start < this.hgt){
            this.flow();
        }
        else if(this.end < this.hgt){
            this.ending();
        }
        else{
            this.start = 0;
            this.end = 0;
            waterArr.splice(0, 1);
        }
    }
}