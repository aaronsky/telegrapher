var Note = {
    OFF: 0,
    SHORT: 1,
    LONG: 2
};

window.addEventListener('load', function () {
    var list = $('#message_container');
    
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

function listenForInput(socket, list) {
    socket.on('listening', function (data) {        
        var str = '';
        if (data.note === Note.SHORT) {
            str = '.';
        } else if (data.note === Note.LONG) {
            str = '_';
        }
        list.prepend(str);
        console.log('I have listened');
        console.log(data);
    });
};