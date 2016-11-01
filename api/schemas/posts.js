/**
 * Created by Girish on 5/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema(
  {
    title: String,
    body: String,
    description: String,
    creation_date: String,
    tags: [
      String
    ]
  }
);

module.exports = mongoose.model('post',postSchema,'posts');