const five = require('johnny-five'),
    BUTTON_PIN = process.env.BUTTON_PIN || 2,
    SPEAKER_PIN = process.env.BUTTON_PIN || 3,
    SPEAKER_FREQ = 523;

const Note = {
    OFF: 0,
    SHORT: 1,
    LONG: 2
};

var socket, user, button, piezo, noteLength;

var counter = 0;
var emitted = false;
var buttonDown = false;
var loop = function () {
    counter++;
    if (counter > 1000 && !emitted && !buttonDown) {
        emitted = true;
        socket.emit('talking', {
            note: Note.OFF,
            name: user.name,
            id: user.id
        });
    }
};
var resetCounter = function () {
    counter = 0;
    emitted = false;
    buttonDown = false;
};

var onButtonDown = function () {
    noteLength = Note.SHORT;
    buttonDown = true;
};

var onButtonHold = function () {
    noteLength = Note.LONG;
};

var onButtonUp = function () {
    console.log(noteLength === Note.LONG ? 'Long press' : 'Short press');
    socket.emit('talking', {
        note: noteLength,
        name: user.name,
        id: user.id
    });
    noteLength = Note.OFF;
    resetCounter();
};

var onReceive = function (note) {
    if (piezo) {
        var duration = note * 500; // in milliseconds
        if (duration > 0) {
            piezo.frequency(SPEAKER_FREQ, duration);
        } else {
            piezo.noTone();
        }
    }
};

var output = function (data) {
    if (typeof data === 'number') {
        onReceive(data);
    } else if (typeof data.note === 'number') {
        onReceive(data.note);
    } else {
        console.log('Stay silent friend');
    }
};

var ready = function () {
    button = new five.Button(BUTTON_PIN);
    piezo = new five.Piezo(SPEAKER_PIN);

    noteLength = Note.OFF;

    button.on('down', onButtonDown);
    button.on('hold', onButtonHold);
    button.on('up', onButtonUp);
    
    this.loop(1, loop);
};

module.exports = function (sock, usr) {
    if (!sock) {
        throw new Error('No socket was passed.');
    } else if (!usr) {
        throw new Error('No user was passed');
    }

    socket = sock;
    user = usr;

    var board = new five.Board({repl: false});

    board.on('ready', ready);
    board.output = output;

    return board;
};

