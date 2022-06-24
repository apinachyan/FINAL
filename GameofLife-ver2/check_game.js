var Grass = require("./grass.js");

module.exports = class GameObject {
    constructor(len,hgt){
        this.directions = [];
        for (var i = 0;i < len;i++){
            for (var j = 0;j < hgt;j++){
                this.directions.push([i,j]);
            }
        }
    }
    chooseCell(character){
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
    restart_game(){
        this.removing(2,grassEaterArr);
        this.removing(3,WildAnimalArr);
        this.removing(4,PlaneArr);
        this.removing(5,bombArr);
        this.removing(6,HumanArr);
        this.removing(7,waterArr);
        
        for(var i = 0; i < this.len;i++){
            for (var j = 0;j < this.hgt;j++){
                var grass_object = new Grass(j,i);
                grassArr.push(grass_object);
            }
        }
    }
    get_ycordinates(){
        for (var i = 0;i < this.hgt;i++){
            this.directions.push([0,i]);
        }
    }
    get_xcordinates(h){
        for (var i = 0;i < this.len;i++){
            this.directions.push([i,h]);
        }
    }
    find_plane(num){
        this.get_xcordinates(num);
        return this.chooseCell(4);
    }
    chooseforplane(num){
        this.get_ycordinates();
        return this.chooseCell(num);
    }
}