var socketio = require('socket.io-client');
var User = require('./user');
var createBoard = require('./board');

var createIo = function (options) {
    var name = options.name || 'User';
    var user = new User(name);

    var socket = socketio(options.address);
    var board = createBoard(socket, user);

    socket.on('connect', function () {
        console.log(name + ' is well connected');
    });
    socket.on('listening', function (data) {
        if (data.id !== user.id) {
            console.log('Received voice data from ' + data.id);
            board.output(data);
        } else {
            console.log('Don\'t listen to yourself');
        }
    });
};

module.exports = {
    io: createIo,
    route: require('./routes')
}