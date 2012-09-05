/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', function (request, response) {
    response.send("Hello World");
});

app.get("/mu-ae97bc8c-43c68105-588f9d9f-2fe027bd", function (req, res) {
    res.send("42");
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


