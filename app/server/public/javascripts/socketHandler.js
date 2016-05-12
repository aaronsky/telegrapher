window.addEventListener('load', function () {
    var list = document.getElementById('container');
    
    var socket = io();
        //     //TODO: TEST TO MAKE SURE THIS WORKS
        // socket.emit('talking', {
        //     note: 1,
        //     name: 'bob',
        //     id: '1',
        // });
        
    updateList(socket, list);
    listenForInput(socket, list);
});

function updateList(socket, list) {
    socket.on('roomAdded', function (data) {
        console.log('room added');
        console.log(data.rooms);
    });
};

function listenForInput(socket, container) {
    socket.on('listening', function (data) {
        console.log('I have listened');
        console.log(data);
    });
};