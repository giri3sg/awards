/**
 * Created by Smurf on 11/7/2016.
 */
var Settings   = require('../schemas/settings');

module.exports.create = function (req, res) {
  console.log(req.body)
  Settings.findOneAndUpdate({},req.body,{upsert: true},function (err,result) {
    res.send(result)
  })
};
module.exports.get = function (req, res) {
  Settings.findOne(function (err,result) {
    res.send(result)
  })
};
