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
  Post.findOne(conditions,function (err,result) {
    res.send(result)
  })
}
