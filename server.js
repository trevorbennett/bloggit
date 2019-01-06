var express = require('express');
var app = express();
var http = require('http');
var html = require('html');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var moment = require('moment');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

var user = "ANONYMOUS";

//Configure Mongoose
mongoose.connect('mongodb://user1:user1@banana-shard-00-00-kkgsc.mongodb.net:27017,banana-shard-00-01-kkgsc.mongodb.net:27017,banana-shard-00-02-kkgsc.mongodb.net:27017/test?ssl=true&replicaSet=banana-shard-0&authSource=admin&retryWrites=true');
mongoose.set('debug', true);

var postSchema = new mongoose.Schema({ body: String });

var Post = mongoose.model('Post', postSchema);

app.post('/addpost', (req, res) => {
    console.log(req.body);
    req.body.body +=  " Created by " + req.body.user + " at " + moment().format('MMMM Do YYYY, h:mm:ss a');
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.use(express.static(__dirname)); // This line.

app.set('view engine', 'ejs');
app.set('port',3000); //TODO: move to .properties

app.get("/", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('index', { posts: posts})
   });
});

app.get("/login", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('login', { posts: posts})
   });
});

var server = http.createServer(app);
var boot = function () {
server.listen(app.get('port'), function(){
console.info('Express server listening on port ' + app.get('port'));
});
}
var shutdown = function() {
server.close();
}
if (require.main === module) {
boot();
}
else {
console.info('Running app as a module')
exports.boot = boot;
exports.shutdown = shutdown;
exports.port = app.get('port');
}
