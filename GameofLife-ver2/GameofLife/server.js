var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

 matrix = [];

for (let y = 0; y < 14; y++){
   matrix[y] = [];
   for (let x = 0; x < 14; x++){
       let num = Math.round(Math.random() * 0);
       matrix[y].push(num);
   }
}

io.sockets.emit('send matrix', matrix);
// socket.on("send matrix",)


 grassArr = [];
 grassEaterArr = [];
 WildAnimalArr = [];
 HumanArr = [];
 PlaneArr = [];

Grass = require("./grass")
GrassEater = require("./grassEater")
WildAnimal = require("./wildAnimal")
Airplane = require("./airplane")
Human = require("./human")
Water  =require("./water")

function createObjects(){
    var gr = new Grass(1,0);
    var eater = new GrassEater(5,5);
    var eater2 = new GrassEater(3,2);
    var animal = new WildAnimal(9,2);
    var pl = new Airplane(2);
    var pl2 = new Airplane(10);
    var h = new Human(3,6);
     w = new Water(14,14)
}


function checkwindow(win){
    win.onkeydown = w.starting();
}

io.sockets.emit('send matrix', matrix)


function game(){
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

    
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

io.on('connection', function (socket) {
    socket.on('send window',checkwindow)
    createObjects(matrix)
})