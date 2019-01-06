var express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

const user = "ANONYMOUS";
const DEFAULT_LIKES = 0;

var postSchema = new mongoose.Schema({ body: String , likes: Number});
var Post = mongoose.model('Post', postSchema);

router.post('/addpost', (req, res) => {
    console.log(req.body);
    req.body.body +=  " Created by " + req.body.user + " at " + moment().format('MMMM Do YYYY, h:mm:ss a');
    req.body.likes = DEFAULT_LIKES;
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

// app.post('likepost', req, res) => {
//
//     req.body.body +=  " Created by " + req.body.user + " at " + moment().format('MMMM Do YYYY, h:mm:ss a');
//     var postData = new Post(req.body);
// }

router.get("/", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('index', { posts: posts})
   });
});

router.get("/login", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('login', { posts: posts})
   });
});

module.exports = router;
