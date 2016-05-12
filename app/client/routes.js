var room = require('./room');

module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log('rendering index');
        res.render('index');
    });

    app.post('/room', function (req, res) {
        var name = req.body.room;
        console.log(req.body);
        req.method = 'GET';
        res.redirect(200, '/room/' + name);
    });
    
    app.get('/room/:id', function (req, res) {
        res.render('room', { roomname: req.params.id });
        room.joinRoom(req.params.id);
    });
    
    // error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
    
    return app;
};