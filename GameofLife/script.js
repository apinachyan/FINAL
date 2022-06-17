var socket = io();


// var matrix = [
    
//  ];
 
// for (let y = 0; y < 14; y++){
//     matrix[y] = [];
//     for (let x = 0; x < 14; x++){
//         let num = Math.round(Math.random() * 0);
//         matrix[y].push(num);
//     }
// }


// var grassArr = [];
// var grassEaterArr = [];
// var WildAnimalArr = [];
// var HumanArr = [];
// var PlaneArr = [];

// var gr = new Grass(1,0);
// var eater = new GrassEater(5,5);
// var eater2 = new GrassEater(3,2);
// var animal = new WildAnimal(9,2);
// var pl = new Airplane(2);
// var pl2 = new Airplane(10);
// var h = new Human(3,6);


 var side = 40;
 
 
 function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');
   
}

console.log(grassArr);



 function drawing(matrix) {
    console.log(matrix);
    fill("white")
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
 
            if (matrix[y][x] == 0) {
                fill("white");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("grey");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 6) {
                fill("Pink");
            }
           
         
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr){
        grassArr[i].mul();
    }

    for (var i in grassEaterArr){
        grassEaterArr[i].start();
    }
    for (var i in WildAnimalArr){
        WildAnimalArr[i].start();
    }

    for (var i in PlaneArr){
        PlaneArr[i].start();
    }

    for (var i in HumanArr){
        HumanArr[i].start();
    }
    

}

setInterval(
    function () {
    socket.on('send matrix', drawing)
    },1000
)
 

 
 