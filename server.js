var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
const { setInterval } = require('timers');
var random_func = require('./random');

weath = 'winter';
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

 grassArr = [];
 grassEaterArr = [];
 WildAnimalArr = [];
 HumanArr = [];
 PlaneArr = [];
 waterArr = [];
 bombArr = [];
 rocketArr = [];

Grass = require("./grass")
GrassEater = require("./grassEater")
WildAnimal = require("./wildAnimal")
Airplane = require("./airplane")
Human = require("./human")
Water  = require("./water")
Rocket = require("./rocket")
GameObject = require("./check_game");

function createObjects(){
    var gr = new Grass(1,0);
    var eater = new GrassEater(5,5);
    var eater2 = new GrassEater(3,2);
    var animal = new WildAnimal(9,2);
    var pl = new Airplane(2);
    var h = new Human(3,6);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}

setInterval(weather, 5000);

function callWater(){
    var w = new Water(14,14);
}

io.sockets.emit('send matrix', matrix)

function restart_the_game(){
    var r = new GameObject(matrix.length,matrix[0].length);
    r.restart_game();
    createObjects(matrix);
}

function add_grass_eater(){
    var res = new GameObject(14,14);
    var arr = res.chooseCell(0);
    var arr1 = res.chooseCell(1);
    if(arr.length > 0){
        var num = random_func(arr.length);
        var rand_x = arr[num][0];
        var rand_y = arr[num][1];
    }
    else if(arr1.length > 0){
        var num = random_func(arr1.length);
        var rand_x = arr1[num][0];
        var rand_y = arr1[num][1];
    }
    var new_grassEater = new GrassEater(rand_x,rand_y);
}
function add_human(){
    var res = new GameObject(14,14);
    var arr = res.chooseCell(0);
    var arr1 = res.chooseCell(1);
    if(arr.length > 0){
        var num = random_func(arr.length);
        var rand_x = arr[num][0];
        var rand_y = arr[num][1];
    }
    else if(arr1.length > 0){
        var num = random_func(arr1.length);
        var rand_x = arr1[num][0];
        var rand_y = arr1[num][1];
    }
    var new_human = new Human(rand_x,rand_y);
}
function add_animal(){
    var res = new GameObject(14,14);
    var arr = res.chooseCell(0);
    var arr1 = res.chooseCell(1);
    if(arr.length > 0){
        var num = random_func(arr.length);
        var rand_x = arr[num][0];
        var rand_y = arr[num][1];
    }
    else if(arr1.length > 0){
        var num = random_func(arr1.length);
        var rand_x = arr1[num][0];
        var rand_y = arr1[num][1];
    }
    var new_animal = new WildAnimal(rand_x,rand_y);
}
function add_airplane(){
    var res = new GameObject(14,14);
    var arr = res.chooseforplane(0);
    var arr1 = res.chooseforplane(1);
    if(arr.length > 0){
        var num = random_func(arr.length);
        var rand_y = arr[num][1];
    }
    else if(arr1.length > 0){
        var num = random_func(arr1.length);
        var rand_y = arr1[num][1];
    }
    var new_plane = new Airplane(rand_y);
}
function add_rocket(){
    var rocket_obj = new Rocket();
}
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
    if (waterArr.length > 0){
        waterArr[0].starting();
    }
    if(rocketArr.length > 0){
        for (var i in rocketArr){
            rocketArr[i].starting();
        }
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000);

io.on('connection', function (socket) {
    restart_the_game();
    socket.on('call_water',callWater);
    socket.on('restart',restart_the_game);
    socket.on('call human',add_human);
    socket.on('call animal',add_animal);
    socket.on('call airplane',add_airplane);
    socket.on('call grassEater',add_grass_eater);
    socket.on('call rocket',add_rocket);
});

function stats(){
    io.sockets.emit('grassLength',grassArr.length);
    io.sockets.emit('grassEaterLength',grassEaterArr.length);
    io.sockets.emit('humanArr',HumanArr.length);
    io.sockets.emit('wildAnimalArr',WildAnimalArr.length);
}
setInterval(stats,1000);