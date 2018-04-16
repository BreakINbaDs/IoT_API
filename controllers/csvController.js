'use strict';

var smartHome = require('../models/csvModel');

// Post current temp and humidity
exports.add_temp_hum = function(req, res) {
  var temperature = req.param('temp');
  var humidity = req.param('hum');
  var address = req.param('add');
  var room = req.param('room');
  var id = req.param('id');
  smartHome.create({temperature: temperature, humidity: humidity, address: address, sensor: {room: room, id: id}}, function (err, result) {
    if (err)
      res.send(err);
    res.status(200).send(result);
  });
};

// Get last N insertions of the exect sensor
exports.get_data_N = function(req, res) {
  var num = parseInt(req.param('num'));
  var room = req.param('room');
  var id = req.param('id');
  smartHome.find({
    sensor.room: room, sensor.id: id})
    .sort('-date')
    .limit(num)
    .exec(function(err, result) {
    if (err)
      res.send(err);
    res.status(200).json(result);
  });
};
