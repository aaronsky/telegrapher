var express = require('express');
var path = require('path');

module.exports = function (type, options) {
    options = options || {};
    var model = null;
    if (type === 'client') {
        model = require('./client');
    } else if (type === 'server') {
        model = require('./server');
    }
    if (!model) {
        throw new Error('An invalid model type was passed. You must pass either \'client\' or \'server\' as a parameter.');
    }

    var app = express();

    if (type === 'server') {
        app.set(express.static(path.join(__dirname, 'server', 'public')));
        app.set('views', path.join(__dirname, 'server', 'views'));
        app.set('view engine', 'pug');
        
        console.log(path.join(__dirname, 'server', 'views'));
        app.get('/', function (req, res) {
            res.render('index');
        });
        
        app.get('/room/:id', function (req, res) {
            res.render('room', { roomname: id });
        });
    }
    
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


    app.io = model(options);

    return app;
};
