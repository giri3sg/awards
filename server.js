/**
 * Created by Giri on 9/25/2016.
 */

// MEAN Stack RESTful API Tutorial
var express    = require('express');
var mongoose   = require('mongoose');
var auth       = require('./api/routes/auth');
var post       = require('./api/routes/posts');
var config     = require('./api/config');
var bodyParser = require('body-parser');
var path       = require('path');

var app = express();
// connect to db
var db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1/cms');
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function(){console.log("Mongoose is Connected!")});

// accept CORS Cross origin resource sharing
app.use(express.static('app'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// authentication
app.get('/user/login', auth.login);
app.post('/user/register', auth.register);
app.post('/api/auth',auth.authenticate);

//posts
app.post('/api/post',post.createPost)
app.get('/api/post',post.getPost)
app.get('/api/post/list',post.postList)
app.get('/api/category/posts',post.postListByCategory)

// sending index file to handle angular routes
app.all('/*', function(req, res) {
  res.sendfile(__dirname + '/app/index.html');
});
// starting the server
app.listen(3000);
console.log("Server running on port 3000");
