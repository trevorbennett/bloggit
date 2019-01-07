//imports
const routes = require("./routes");
var express = require('express');
var app = express();
var http = require('http');
var html = require('html');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Required to parse HTTP Posts as JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//Configure Mongoose
mongoose.connect('mongodb://user1:user2@banana-shard-00-00-kkgsc.mongodb.net:27017,banana-shard-00-01-kkgsc.mongodb.net:27017,banana-shard-00-02-kkgsc.mongodb.net:27017/test?ssl=true&replicaSet=banana-shard-0&authSource=admin&retryWrites=true');
mongoose.set('debug', true);

//Configure View Engine
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.set('port',3000); //TODO: move to .properties
app.use('/', routes);

//server setup and shutdown
var server = http.createServer(app);
var boot = function() {
    server.listen(app.get('port'), function() {
        console.info('Express server listening on port ' + app.get('port'));
    });
}
var shutdown = function() {
    server.close();
}
if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module')
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}
