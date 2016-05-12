window.addEventListener('load', function () {
    var list = document.getElementById('container');
    var socket = io();
    updateList(socket, list);
});

function updateList(socket, list) {
    socket.on('roomAdded', function (data) {
        console.log(data.rooms);
    });
};