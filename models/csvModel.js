var mongoose = require('mongoose');

var smartHome = mongoose.Schema({
    temperature: String,
    humidity: String,
    date: { type: Date, default: Date.now },
    address: String,
    sensor: {
      room: String,
      id: String
    }
});

var smartHome = mongoose.model('smartHome', csvSchema);

module.exports = smartHome;
