var LivingCreature = require("./livingcreature");
var random_func = require("./random");

module.exports = class Rocket extends LivingCreature{
    constructor(){
        var start_pos = [[0,0],[0,matrix.length - 1],[matrix[0].length - 1,0],[matrix[0].length - 1,matrix.length - 1]];
        var choosen_pos = random_func(start_pos);
        var initx = choosen_pos[0];
        var inity = choosen_pos[1];
        super(initx,inity);
        this.goalx = 0;
        this.goaly = 0;
        this.human_pos = 0;
        this.airplane_pos = 0;
        this.animal_pos = 0;
        this.find_airplane = false;
        this.find_animal = false;
        this.init_done = false;
        matrix[this.y][this.x] = 8;
        rocketArr.push(this);
        this.pos_arr = rocketArr.length - 1;
    }
    get_area(){
        if(this.x == 0 && this.y == 0){
            for (var i = 0;i < matrix.length / 2;i++){
                for (var j = 0;j < matrix[0].length / 2; j++){
                    this.directions.push([j,i]);
                }
            }
        }
        else if (this.x == (matrix[0].length - 1) && this.y == 0){
            for (var i = 0;i < matrix.length / 2;i++){
                for (var j = matrix[0].length - 1;j >= matrix[0].length / 2;j--){
                    this.directions.push([j,i]);
                }
            }
        }
        else if (this.x == 0 && this.y == (matrix.length - 1)){
            for (var i = matrix.length - 1;i >= matrix.length / 2;i--){
                for (var j = 0;j < matrix[0].length / 2; j++){
                    this.directions.push([j,i]);
                }
            }
        }
        else if (this.x == (matrix[0].length - 1) && this.y == (matrix.length - 1)){
            for (var i = matrix.length - 1;i >= matrix.length / 2;i--){
                for (var j = matrix[0].length - 1;j >= matrix[0].length / 2;j--){
                    this.directions.push([j,i]);
                }
            }
        }
    }
    killing_area(){
        this.directions = [
            [this.x - 2,this.y - 2],
            [this.x + 2,this.y - 2],
            [this.x - 1,this.y - 1],
            [this.x + 1,this.y - 1],
            [this.x - 1,this.y],
            [this.x + 1,this.y],
            [this.x - 1,this.y + 1],
            [this.x + 1,this.y + 1],
            [this.x - 2,this.y + 2],
            [this.x + 2,this.y + 2]
        ];
    }
    removing(num,globalArr){
        this.killing_area();
        var arr = this.chooseCell(num);
        if(arr.length > 0){
            for (var i in arr){
                var x = arr[i][0];
                var y = arr[i][1];
                matrix[y][x] = 0;
                for (var i = 0;i < globalArr.length;i++) {
                    if (x == globalArr[i].x && y == globalArr[i].y) {
                    globalArr.splice(i, 1);
                    break;
                    }
                }
            }
        }
    }
    survey_area(){
        this.get_area();
        var arr_plane = this.chooseCell(4);
        var arr_animal = this.chooseCell(3);
        var arr_human = this.chooseCell(6);
        if (arr_plane.length > 0){
            var min_distance = arr_plane[0][0] + arr_plane[0][1];
            for (var i in arr_plane){
                var distance = arr_plane[i][0] + arr_plane[i][1];
                if (min_distance > distance){
                    min_distance = distance;
                    this.goalx = arr_plane[i][0];
                    this.goaly = arr_plane[i][1];
                }
            }
            for (var i = 0;i < PlaneArr.length;i++) {
                if (this.goalx == PlaneArr[i].x && this.goaly == PlaneArr[i].y) {
                    this.airplane_pos = PlaneArr[i].posit;
                }
            }
            this.find_airplane = true;
        }
        else if (arr_human.length > 0){
            var min_distance = arr_human[0][0] + arr_human[0][1];
            for (var i in arr_human){
                var distance = arr_human[i][0] + arr_human[i][1];
                if (min_distance > distance){
                    min_distance = distance;
                    this.goalx = arr_human[i][0];
                    this.goaly = arr_human[i][1];
                }
            }
            for (var i = 0;i < HumanArr.length;i++) {
                if (this.goalx == HumanArr[i].x && this.goaly == HumanArr[i].y) {
                    this.human_pos = HumanArr[i].pos;
                }
            }
        }
        else if (arr_animal.length > 0){
            var min_distance = arr_animal[0][0] + arr_animal[0][1];
            for (var i in arr_animal){
                var distance = arr_animal[i][0] + arr_animal[i][1];
                if (min_distance > distance){
                    min_distance = distance;
                    this.goalx = arr_animal[i][0];
                    this.goaly = arr_animal[i][1];
                }
            }
            for (var i = 0;i < WildAnimalArr.length;i++) {
                if (this.goalx == WildAnimalArr[i].x && this.goaly == WildAnimalArr[i].y) {
                    this.animal_pos = WildAnimalArr[i].pos;
                }
            }
            this.find_animal = true;
        }
        else{
            this.kill();
        }
    }
    update_pos(){
        if(this.find_airplane == true){
            if (PlaneArr.length > 0){
                var object = PlaneArr[this.airplane_pos];
                this.goalx = object.x;
                this.goaly = object.y;
            }
        }
        else if(this.find_animal == true){
            if(WildAnimalArr.length > 0){
                var object = WildAnimalArr[this.animal_pos];
                this.goalx = object.x;
                this.goaly = object.y; 
            }   
        }
        else{
            if(HumanArr.length > 0){
                var object = HumanArr[this.human_pos];
                this.goalx = object.x;
                this.goaly = object.y; 
            }
        }
    }
    choose_nextfieldx(ch,direct){
        this.directions = [];
        if (direct == 'plus' && this.x < matrix[0].length - 1){
            this.directions[0] = [this.x + 1, this.y];
        }
        else if(direct == 'minus' && this.x > 0){
            this.directions[0] = [this.x - 1, this.y];
        }
        return this.chooseCell(ch);
    }
    choose_nextfieldy(ch,direct){
        this.directions = [];
        if(direct == 'plus' && this.y < matrix.length - 1){
            this.directions[0] = [this.x, this.y + 1];
        }
        else if (direct == 'minus' && this.y > 0){
            this.directions[0] = [this.x, this.y - 1];
        }
        return this.chooseCell(ch);
    }
    movement(){
        this.update_pos();
        if(this.x < this.goalx){
            var arr1 = this.choose_nextfieldx(1,'plus')
            var arr2 = this.choose_nextfieldx(2,'plus')
            var arr3 = this.choose_nextfieldx(3,'plus')
            var arr4 = this.choose_nextfieldx(4,'plus')
            var arr6 = this.choose_nextfieldx(6,'plus')

            if(arr1.length > 0){
                matrix[this.y][this.x] = 1; 
            }
            else if(arr2.length > 0){
                matrix[this.y][this.x] = 2; 
            }
            else if(arr3.length > 0){
                matrix[this.y][this.x] = 3; 
            }
            else if(arr4.length > 0){
                matrix[this.y][this.x] = 4; 
            }
            else if(arr6.length > 0){
                matrix[this.y][this.x] = 6; 
            }
            else{
                matrix[this.y][this.x] = 0; 
            }
            this.x += 1;
            matrix[this.y][this.x] = 8;
        }
        else if(this.x > this.goalx){
            var arr1 = this.choose_nextfieldx(1,'minus')
            var arr2 = this.choose_nextfieldx(2,'minus')
            var arr3 = this.choose_nextfieldx(3,'minus')
            var arr4 = this.choose_nextfieldx(4,'minus')
            var arr6 = this.choose_nextfieldx(6,'minus')

            if(arr1.length > 0){
                matrix[this.y][this.x] = 1; 
            }
            else if(arr2.length > 0){
                matrix[this.y][this.x] = 2; 
            }
            else if(arr3.length > 0){
                matrix[this.y][this.x] = 3; 
            }
            else if(arr4.length > 0){
                matrix[this.y][this.x] = 4; 
            }
            else if(arr6.length > 0){
                matrix[this.y][this.x] = 6; 
            }
            else{
                matrix[this.y][this.x] = 0; 
            }
            this.x -= 1;
            matrix[this.y][this.x] = 8;
        }
        if(this.y < this.goaly){
            var arr1 = this.choose_nextfieldy(1,'plus')
            var arr2 = this.choose_nextfieldy(2,'plus')
            var arr3 = this.choose_nextfieldy(3,'plus')
            var arr4 = this.choose_nextfieldy(4,'plus')
            var arr6 = this.choose_nextfieldy(6,'plus')

            if(arr1.length > 0){
                matrix[this.y][this.x] = 1; 
            }
            else if(arr2.length > 0){
                matrix[this.y][this.x] = 2; 
            }
            else if(arr3.length > 0){
                matrix[this.y][this.x] = 3; 
            }
            else if(arr4.length > 0){
                matrix[this.y][this.x] = 4; 
            }
            else if(arr6.length > 0){
                matrix[this.y][this.x] = 6; 
            }
            else{
                matrix[this.y][this.x] = 0; 
            }
            this.y += 1;
            matrix[this.y][this.x] = 8;
        }
        else if(this.y > this.goaly){
            var arr1 = this.choose_nextfieldy(1,'minus')
            var arr2 = this.choose_nextfieldy(2,'minus')
            var arr3 = this.choose_nextfieldy(3,'minus')
            var arr4 = this.choose_nextfieldy(4,'minus')
            var arr6 = this.choose_nextfieldy(6,'minus')

            if(arr1.length > 0){
                matrix[this.y][this.x] = 1; 
            }
            else if(arr2.length > 0){
                matrix[this.y][this.x] = 2; 
            }
            else if(arr3.length > 0){
                matrix[this.y][this.x] = 3; 
            }
            else if(arr4.length > 0){
                matrix[this.y][this.x] = 4; 
            }
            else if(arr6.length > 0){
                matrix[this.y][this.x] = 6; 
            }
            else{
                matrix[this.y][this.x] = 0; 
            }
            this.y -= 1;
            matrix[this.y][this.x] = 8;
        }
    }
    kill(){
        matrix[this.y][this.x] = 0;
        rocketArr.splice(this.pos_arr,1);
        this.removing(1,grassArr);
        this.removing(2,grassEaterArr);
        this.removing(3,WildAnimalArr);
        this.removing(4,PlaneArr);
        this.removing(6,HumanArr);
    }
    init(){
        this.survey_area();
        this.init_done = true;
    }
    starting(){
        if(this.init_done == false){
            this.init();
        }
        else{
            if(this.x == this.goalx && this.y == this.goaly){
                this.kill();
            }
            else{
                this.movement();
            }
        }
    }
}
