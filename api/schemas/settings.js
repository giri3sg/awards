/**
 * Created by Girish on 5/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingsSchema =  new Schema({ categories: Schema.Types.Mixed });



module.exports = mongoose.model('settings',settingsSchema,'settings');