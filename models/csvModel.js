var mongoose = require('mongoose');

var smartHome = mongoose.Schema({
    data: mongoose.Schema.Types.Mixed,
    date: { type: Date, default: Date.now },
    sensor: {
      room: String,
      sensortype: String,
      id: Number
    }
});

var smartUser = mongoose.Schema({
    password: String,
    mobile_phone: String
});

var smartHome = mongoose.model('smartHome', smartHome);
var smartUser = mongoose.model('smartUser', smartUser);


module.exports = smartHome;
module.exports = smartUser;
