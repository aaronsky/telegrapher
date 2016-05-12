var http = require('http');
var socketio = require('socket.io');

var createIo = function (options) {
    var io = socketio();
    
    io.on('connection', function (socket) {
        socket.on('talking', function (data) {
            console.log ('Received data from ' + data.name + '@' + data.id + '. Sending to others...');
            socket.emit('listening', data);
        });
        
        socket.join('testroom');
        
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