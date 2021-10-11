var express = require('express');  //node_modules
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//vista estatica
app.use(express.static('client'));

app.get('/hola-mundo', function (req, res) {
    res.status(200).send('hola mundo desde una ruta');
});


//array mensajes
var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado NodeJs',
    nickname: 'Alexander Leon'
}];

io.on('connection', function (socket) {
    console.log("El cliente con IP: "+socket.handshake.address+" se ha conectado...");

    socket.emit('messages', messages);
    //recibir evento recojo 
    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });


});

//server 
server.listen(8000, function () {
    console.log('servidor esta funcionando en http://localhost:8000')
});
