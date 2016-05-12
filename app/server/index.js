var http = require('http');
var socketio = require('socket.io');

var createIo = function (options) {
    var io = socketio();
    
    io.on('connection', function (socket) {
        
        socket.join('testroom');
        
        socket.on('talking', function (data) {
            var msg = 'Received data from ' + data.name + '@' + data.id + '. Sending to others...';
            io.to('testroom').emit('msgReceived', {
                msg: msg
            });
            console.log(msg);
            io.to('testroom').emit('listening', data);
        });
        
        console.log('joining room');
        io.to('testroom').emit('roomAdded', {
            rooms: io.sockets.adapter.rooms
        });
    });
    
    return io;
};

module.exports = {
    io: createIo,
    route: require('./routes')
}