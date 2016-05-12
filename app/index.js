var express = require('express');
var bodyParser = require('body-parser');
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

    console.log(path.join(__dirname, type, 'public'));
    
    // app.set(express.static(path.join(__dirname, type, 'public')));
    app.use('/assets', express.static(path.join(__dirname, type, 'public')));
    app.set('views', path.join(__dirname, type, 'views'));
    app.set('view engine', 'pug');
    
    app.use(bodyParser.urlencoded({ extended: false }));

    app = model.route(app);
    app.io = model.io(options);

    return app;
};
