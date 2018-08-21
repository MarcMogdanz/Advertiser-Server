var express = require('express')();
var http = require('http').Server(express);
var bodyParser = require('body-parser');

var morgan = require('morgan');
var config = require('./config.js');

express.use(morgan('dev'));
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());

var port = 3000;

// Get all routes and prefix them with /api/
var routes = require('./routes.js');
express.use('/api/', routes);

// Start the server
http.listen(port, function() {
    console.log('Started server on port: ' + port);
});
