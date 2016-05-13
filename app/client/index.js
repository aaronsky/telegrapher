var socketio = require('socket.io-client');
var User = require('./user');
var createBoard = require('./board');
var room = require('./room');

var createIo = function (options) {
    var name = options.name || 'User';
    var user = new User(name);

    var socket = socketio(options.address);
    var board = createBoard(socket, user);
    room.init(socket);

    socket.on('connect', function () {
        console.log(name + ' is well connected');
        
        //TODO: TEST TO MAKE SURE THIS WORKS
        socket.emit('talking', {
            note: 1,
            name: 'bob',
            id: '1',
        });
    });
    
    socket.on('listening', function (data) {
        if (data.id !== user.id) {
            console.log('Received voice data from ' + data.id);
            board.output(data);
        } else {
            console.log('Don\'t listen to yourself');
            board.output(data);
        }
    });
    
    // return socket;
};

module.exports = {
    io: createIo,
    route: require('./routes')
}