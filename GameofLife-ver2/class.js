// class Grass {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//         matrix[y][x] = 1;
//         grassArr.push(this);
//     }

//     mul() {
//         let emptyCells = this.chooseCell(0);
//         if (emptyCells.length > 0){
//         var rand = Math.round(Math.random() * (emptyCells.length - 1));
//         var x = emptyCells[rand][0];
//         var y = emptyCells[rand][1];
//         matrix[y][x] = 1;
//         new Grass(x,y);
//         }
//     }

//     chooseCell(character) {
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }


  
// }

// class GrassEater {
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//         this.energy = 8;
//         this.directions = [];
//         this.multiplay = 0;

//         matrix[y][x] = 2;
//         grassEaterArr.push(this);
//     }

//     chooseCell(character){
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }

// getNewCoordinates(){
//    this.directions = [
//     [this.x - 1, this.y - 1],
// 	[this.x    , this.y - 1],
// 	[this.x + 1, this.y - 1],
//     [this.x - 1, this.y    ],
//     [this.x + 1, this.y    ],
//     [this.x - 1, this.y + 1],
//     [this.x    , this.y + 1],
//     [this.x + 1, this.y + 1]
//    ];
// }

// move () {
//     var emptyC = this.chooseCell(0);
//     var randIndex = Math.round(Math.random() * (emptyC.length - 1));
//     var NewX = emptyC[randIndex][0];
//     var NewY = emptyC[randIndex][1];
//     matrix[this.y][this.x] = 0;
//     matrix[NewY][NewX] = 2;
//     this.x = NewX;
//     this.y = NewY;
//     this.energy--;
// }
// eat () {
//     var eatArr = this.chooseCell(1);
//     var ran = Math.round(Math.random() * (eatArr.length - 1));
//     var x_eat = eatArr[ran][0];
//     var y_eat = eatArr[ran][1];
//     matrix[this.y][this.x] = 0;
//     matrix[y_eat][x_eat] = 2;
//     this.x = x_eat;
//     this.y = y_eat;
//     this.energy += 3;
//     for (var i in grassArr) {
//         if (x_eat == grassArr[i].x && y_eat == grassArr[i].y) {
//             grassArr.splice(i, 1);
//             break;
//         }
//     }
// }

// die (){
//     if (this.energy <= 0){
//         matrix[this.y][this.x] = 0;
//         for (var i in grassEaterArr) {
//             if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
//                 grassEaterArr.splice(i, 1);
//                 break;
//             }
//         }  
//     }
// }
// multi(){
//     if (this.energy >= 20){
//         var multiCell = this.chooseCell(0);
//         if (multiCell.length > 0){
//             var rd = Math.round(Math.random() * (multiCell.length - 1));
//             var x_mul = multiCell[rd][0];
//             var y_mul = multiCell[rd][1];
//             var newEater = new GrassEater(x_mul,y_mul);
//             grassEaterArr.push(newEater);
//             this.energy = 11;
//         }
        
//     }
// }

// start (){
//     if (this.chooseCell(1).length > 0){
//         this.eat();
//     }
//      else if (this.chooseCell(0).length > 0){
//         this.move();
//     }
//     if (this.energy >= 20){
        
//         this.multi();
        
//     }
//     if (this.energy <= 0){
//         this.die();
//     }
// }
// }

// class WildAnimal {
//     constructor(x,y) {
//         this.x = x;
//         this.y = y;
//         this.energy = 15;
//         this.directions = [];
//         matrix[y][x] = 3;
//         WildAnimalArr.push(this);
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
//      }

    
//      chooseCell(character){
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }


//     move () {
//         var emptyC = this.chooseCell(0);
//         var randIndex = Math.round(Math.random() * (emptyC.length - 1));
//         var NewX = emptyC[randIndex][0];
//         var NewY = emptyC[randIndex][1];
//         matrix[this.y][this.x] = 0;
//         matrix[NewY][NewX] = 3;
//         this.x = NewX;
//         this.y = NewY;
//         this.energy--;
//     }

//     eat () {
//         var eatArr = this.chooseCell(2);
//         var ran = Math.round(Math.random() * (eatArr.length - 1));
//         var x_eat = eatArr[ran][0];
//         var y_eat = eatArr[ran][1];
//         matrix[this.y][this.x] = 0;
//         matrix[y_eat][x_eat] = 3;
//         this.x = x_eat;
//         this.y = y_eat;
//         this.energy += 3;
//         for (var i in grassEaterArr) {
//             if (x_eat == grassEaterArr[i].x && y_eat == grassEaterArr[i].y) {
//             grassEaterArr.splice(i, 1);
//                 break;
//             }
//         }
//     }

//     eatHuman () {
//         var eatArr = this.chooseCell(6);
//         var ran = Math.round(Math.random() * (eatArr.length - 1));
//         var x_eat = eatArr[ran][0];
//         var y_eat = eatArr[ran][1];
//         matrix[this.y][this.x] = 0;
//         matrix[y_eat][x_eat] = 3;
//         this.x = x_eat;
//         this.y = y_eat;
//         this.energy += 3;
//         for (var i in HumanArr) {
//             if (x_eat == HumanArr[i].x && y_eat == HumanArr[i].y) {
//                 HumanArr.splice(i, 1);
//                 break;
//             }
//         }
//     }


//     multi(){
//         if (this.energy >= 20){
//             var multiCell = this.chooseCell(0);
//             if (multiCell.length > 0){
//                 var rd = Math.round(Math.random() * (multiCell.length - 1));
//                 var x_mul = multiCell[rd][0];
//                 var y_mul = multiCell[rd][1];
//                 var newEater = new  WildAnimal(x_mul,y_mul);
//                 WildAnimalArr.push(newEater);
//                 this.energy = 11;
//             }
            
//         }
//     }
    
//     die (){
//         if (this.energy <= 0){
//             matrix[this.y][this.x] = 0;
//             for (var i in WildAnimalArr) {
//                 if (this.x == WildAnimalArr[i].x && this.y == WildAnimalArr[i].y) {
//                     WildAnimalArr.splice(i, 1);
//                     break;
//                 }
//             }  
//         }
//     }

//     start (){
//         if (this.chooseCell(2).length > 0){
//             this.eat();
//         }
//          else if (this.chooseCell(0).length > 0){
//             this.move();
//         }
//         if (this.chooseCell(6).length > 0){
//             this.eatHuman();
//         }
//         if (this.energy >= 20){
            
//             this.multi();
            
//         }
//         if (this.energy <= 0){
//             this.die();
//         }
//     }

// }
// class Airplane {
//     constructor(y){
//         this.directions = [];
//         this.y = y;
//         this.x = 0;
//         this.time = 0;
//         matrix[this.y][this.x] = 4;
//         PlaneArr.push(this);
        
//     }

// newPlane (){
//     if (this.x >= matrix.length - 1){
//             var random_y = Math.round(Math.random() * matrix.length - 1);
//             var NewPlane = new Airplane(random_y);
//         } 
// }



// move (){
//     matrix[this.y][this.x] = 0;
//     this.x++;
//     matrix[this.y][this.x] = 4;  
// // erb vor hasni verjin x = 0 ;
//     if (this.x >= matrix.length - 1){
//         matrix[this.y][this.x] = 0;
//         for (var i in PlaneArr){
//             if (this.y == PlaneArr[i].y)
//             PlaneArr.splice(i,1);
//         }
    
// }
   
// }
    

// bomb (){
//     if (this.x >= matrix[0].length / 2){
//         var bomb_x = matrix.length / 2  - 1;
//         var boomb = new Bomb(bomb_x,this.y);
//         this.time++;
//         if (this.time >= 6){
//         matrix[this.y][bomb_x] = 0; 
//         var CellArray = boomb.chooseCell(1);
//         var EaterArray = boomb.chooseCell(2);
//         var AnimalArray = boomb.chooseCell(3);
//         var HumanArray = boomb.chooseCell(6);
//         for (var i in CellArray){
//             var x = CellArray[i][0];
//             var y = CellArray[i][1];
//             matrix[y][x] = 0;
//             for (var i in grassArr) {
//                 if (x == grassArr[i].x && y == grassArr[i].y) {
//                 grassArr.splice(i, 1);
//                     break;
//                 }
//             }
//           }
//           if(EaterArray.length > 0){
//             for (var i in EaterArray){
//                 var x = EaterArray[i][0];
//                 var y = EaterArray[i][1];
//                 matrix[y][x] = 0;
//                 for (var i in grassEaterArr) {
//                     if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
//                     grassEaterArr.splice(i, 1);
//                         break;
//                     }
//                 }
//               } 
//           }
//           if(AnimalArray.length > 0){
//             for (var i in AnimalArray){
//                 var x = AnimalArray[i][0];
//                 var y = AnimalArray[i][1];
//                 matrix[y][x] = 0;
//                 for (var i in WildAnimalArr) {
//                     if (x == WildAnimalArr[i].x && y == WildAnimalArr[i].y) {
//                     WildAnimalArr.splice(i, 1);
//                         break;
//                     }
//                 }
//               } 
//           }
//           if(HumanArray.length > 0){
//             for (var i in HumanArray){
//                 var x = HumanArray[i][0];
//                 var y = HumanArray[i][1];
//                 matrix[y][x] = 0;
//                 for (var i in HumanArr) {
//                     if (x == HumanArr[i].x && y == HumanArr[i].y) {
//                     HumanArr.splice(i, 1);
//                         break;
//                     }
//                 }
//               } 
//           }
//         }
//     }
        
// }


// start(){
//     this.move();

//     if (this.x >= matrix[0].length / 2){
//         this.bomb();
//     }
//     if (this.x >= matrix.length - 1){
//         this.newPlane();
//     }
// }

    
// }

// class Bomb {
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
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

//     chooseCell(character){
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }



// }

// class Human {
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//         this.directions = [];
//         this.energy = 14;
        
//         matrix[y][x] = 6;
//         HumanArr.push(this);

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


//     getNewBiggerCoordinates(){
//         this.directions = [
//          [this.x - 2, this.y - 2],
//          [this.x - 1, this.y - 2],
//          [this.x,     this.y - 2],
//          [this.x + 1, this.y - 2],
//          [this.x + 2, this.y - 2],
//          [this.x - 2, this.y - 1],
//          [this.x + 2, this.y - 1],
//          [this.x - 2, this.y    ],
//          [this.x + 2, this.y    ],
//          [this.x - 2, this.y + 1],
//          [this.x + 2, this.y + 1],
//          [this.x - 2, this.y + 2],
//          [this.x - 1, this.y + 2],
//          [this.x,     this.y + 2],
//          [this.x + 1, this.y + 2],
//          [this.x + 2, this.y + 2],
//         ];
//      }

    
//      chooseCell(character){
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }
//     chooseBiggerCell(character){
//         this.getNewBiggerCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }


//     move () {
//         var emptyC = this.chooseCell(0);
//         var randIndex = Math.round(Math.random() * (emptyC.length - 1));
//         var NewX = emptyC[randIndex][0];
//         var NewY = emptyC[randIndex][1];
//         matrix[this.y][this.x] = 0;
//         matrix[NewY][NewX] = 6;
//         this.x = NewX;
//         this.y = NewY;
//         this.energy--;
//     }

// RunAway (){
//     var y_h = this.y;
//     var x_h = this.x;
//         var Arr = this.chooseBiggerCell(3);
//         if (Arr.length > 0){ 
//             for (let i = 0; i < Arr.length; i++){
//             // for (let j = 1; j < Arr[i].length; j++){
//                 if (this.y > Arr[i][1] && this.y < matrix.length){
//                     y_h = this.y + 1;
//                 }
//                 else if (this.y < Arr[i][1] && this.y > 0){
//                     y_h = this.y - 1;
//                 }
//         }
//         for (let i = 0; i < Arr.length; i++){
//             // for (let j = 0; j < Arr[i].length - 1; j++){
//                 if (this.x > Arr[i][0] && this.x < matrix.length - 1){
//                     x_h = this.x + 1;
//                 }
//                 else if (this.x < Arr[i][0] && this.x > 0){
//                     x_h = this.x - 1;
//                 }
//             // }   
//         }
//         matrix[this.y][this.x] = 0;
//         matrix[y_h][x_h] = 6;
//         this.x = x_h;
//         this.y = y_h;
//         this.energy = this.energy - 2;
//     }
// }






//     eat () {
//         var eatArr = this.chooseCell(2);
//         var ran = Math.round(Math.random() * (eatArr.length - 1));
//         var x_eat = eatArr[ran][0];
//         var y_eat = eatArr[ran][1];
//         matrix[this.y][this.x] = 0;
//         matrix[y_eat][x_eat] = 6;
//         this.x = x_eat;
//         this.y = y_eat;
//         this.energy += 3;
//         for (var i in grassEaterArr) {
//             if (x_eat == grassEaterArr[i].x && y_eat == grassEaterArr[i].y) {
//             grassEaterArr.splice(i, 1);
//                 break;
//             }
//         }
//     }

//     multi(){
//         if (this.energy >= 20){
//             var multiCell = this.chooseCell(0);
//             if (multiCell.length > 0){
//                 var rd = Math.round(Math.random() * (multiCell.length - 1));
//                 var x_mul = multiCell[rd][0];
//                 var y_mul = multiCell[rd][1];
//                 var NewHuman = new  Human(x_mul,y_mul);
//                 HumanArr.push(NewHuman);
//                 this.energy = 11;
//             }
            
//         }
//     }
    
//     die (){
//         if (this.energy <= 0){
//             matrix[this.y][this.x] = 0;
//             for (var i in HumanArr) {
//                 if (this.x == HumanArr[i].x && this.y == HumanArr[i].y) {
//                     HumanArr.splice(i, 1);
//                     break;
//                 }
//             }  
//         }
//     }

//     start (){
//         if (this.chooseCell(2).length > 0){
//             this.eat();
//         }
//         else if (this.chooseCell(0).length > 0){
//             this.move();
//         }
//         if (this.chooseBiggerCell(3).length > 0){
//             this.RunAway();
//         }
//         if (this.energy >= 20){
            
//             this.multi();
            
//         }
//         if (this.energy <= 0){
//             this.die();
//         }
//     }



// }