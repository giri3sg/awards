/**
 * Created by Girish on 5/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
    token: String
  }
);

module.exports = mongoose.model('user',userSchema,'users')