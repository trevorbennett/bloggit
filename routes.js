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

router.post('/likepost', (req, res) => {
    var body = req.body;
    Post.findOneAndUpdate({ body: body.body }, {$set:{likes: parseInt(body.likes || 0) + 1}}, {new:true, upsert:true}, (err, doc) => {
      if(err) {
        console.log("upvote failed " + err);
      }
    }).then( result => {
      var text = '';
      for (var key in body) {
        text += 'Index is: ' + key + '\nDescription is:  ' + body[key] +"\n\n";
      }
      console.log("Got a response: ", text);
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

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
