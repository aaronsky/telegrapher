var Note = {
    OFF: 0,
    SHORT: 1,
    LONG: 2
};
var curSpeaker = '';
var activeMessage = messageBox('');


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
        } else if (data.note === Note.OFF) {
            str = ' ';
        }
        
        if (data.name !== curSpeaker) {
            curSpeaker = data.name;
            activeMessage = messageBox(curSpeaker);
            activeMessage.attach(list);
        };
        activeMessage.write(str);
    });
};


/**
 * A container for a speakerBox containing a message
 */
function messageBox(speakerName) {
    var $container = $('<div></div>', {class:'message'});
    var $speaker = $('<span></span>', {class: 'message_speaker'});
    var $text = $('<span></span>', {class:'message_text'});
    
    $speaker.text(speakerName + ': ');   
    $container.prepend($text);
    $container.prepend($speaker);
    
    /**
     * Prepend the messageBox to the specified
     * element
     */
    var attach = function ($el) {
        $el.prepend($container);
    };
    
    
    /**
     * given a character, write it in the text container
     * of the messageBox.
     */
    var write = function (char) {
        $text.prepend(char);
    };
    
    return {
        attach: attach,
        write: write
    }
};