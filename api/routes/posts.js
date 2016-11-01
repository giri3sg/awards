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