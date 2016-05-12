var socket;

/**
 * Initialize the room object by connecting it to a socket
 */
var init = function (sock, roomName) {
    socket = sock;
};


/**
 * join a specified room
 */
var joinRoom = function (roomName) {
    socket.join(roomName);
};


/**
 * Export the object
 */
module.exports = {
    init: init,
    joinRoom: joinRoom,
};