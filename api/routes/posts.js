/**
 * Created by Smurf on 11/1/2016.
 */
var Post   = require('../schemas/posts');

module.exports.createPost = function (req, res) {
  console.log(req.body)
  var post = new Post(req.body)
  post.save(function (err,result) {
    res.send(result)
  })
}
module.exports.editPost = function (req,res) {
  var condition = {_id : req.query.id};
  var update = {$set: req.body};
  console.log(req.query)
  console.log(req.body)
  Post.findOneAndUpdate(condition, update, function(err, result){
    if(err) { throw err; }
    else { res.send(result);}
  });
}

module.exports.postList = function (req,res) {
  Post.find(function (err,result) {
    res.send(result)
  })
}
module.exports.postListByCategory = function (req,res) {
  var conditions = {'categories.cat': req.query.cat};
  if(req.query.subcat != undefined)
    conditions =  { $and: [{'categories.cat': req.query.cat},{'categories.subcat': req.query.subcat}]};
  Post.find(conditions,function (err,result) {
    res.send(result)
  })
}
module.exports.postListByTag = function (req,res) {
  var conditions = {tags: req.query.tag};
  Post.find(conditions,function (err,result) {
    res.send(result)
  })
}
module.exports.getPost = function (req,res) {
  var conditions = {_id: req.query.id};
  var exclude = {_id: 0}
  Post.findOne(conditions,exclude,function (err,result) {
    res.send(result)
  })
}
