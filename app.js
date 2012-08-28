/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , cluster = require('cluster')
    , numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('fork', function(worker) {
        console.log("New worker is being created "+worker.id);
    });

    cluster.on('listening', function(worker, address) {
        console.log("New worker is listening "+worker.id);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log("worker is exiting "+worker.id);
        cluster.fork();
    });

    cluster.on('online', function(worker) {
        console.log("Yay, the worker responded after it was forked");
    });

} else {

    var app = express();

    app.configure(function () {
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    app.get('/', routes.index);

    http.createServer(app).listen(app.get('port'), function () {

        console.log("Express server listening on port " + app.get('port'));
    });
}
