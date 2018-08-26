'use strict';

var smartHome = require('../models/csvModel');
var smartUser = require('../models/csvModel');
var bcrypt = require('bcrypt');
const saltRounds = 10;

//Create new smartUser
exports.auth = function functionName(req, res) {
  var password = req.body.password;
  var mobile_phone = req.body.tel;

  var salt = bcrypt.genSaltSync(saltRounds);
  // var hash_password = bcrypt.hashSync(password, salt);

  smartUser.create({
    password: password,
    mobile_phone: mobile_phone
  }, function (err, result) {
    if (err){
      console.log(err);
      res.status(400).send('Authentification failed!');
    } else {
      res.json(result);
    }
  });
};

//Login
exports.login = function(req, res) {
  var password = req.body.password;
  var mobile_phone = req.body.tel;

  smartUser.find({
    'mobile_phone': mobile_phone,
    'password': password
  }).limit(1)
  .exec(function(err, result) {
    if (err)
      res.send(err);
    // const match =  bcrypt.compare(password, result.password);
    if (result[0] !== undefined){
      res.status(200).send('Authorization successful!');
    } else {
      res.status(400).send('Authorization failed!');
    }
  });
};

// Post current temp and humidity
exports.sensor_info = function(req, res) {
  var data = req.body.data;
  var room = req.body.sensor.room;
  var type = req.body.sensor.type;
  var id = req.body.sensor.id;

  smartHome.create({data: data, sensor: {room: room, sensortype: type, id: id}}, function (err, result) {
    if (err){
      console.log(err);
      res.status(404).send('Error');
    } else {
      res.json(result);
    }
  });
};

// Get last N insertions of the exect sensor
exports.get_data = function(req, res) {
  var id = req.params.id;
  var room = req.params.room;
  var num = parseInt(req.params.limit);
  console.log(num + " TUT " + room);
  smartHome.find({
    'sensor.room': room, 'sensor.id': id})
    .sort('-date')
    .limit(num)
    .exec(function(err, result) {
    if (err)
      res.send(err);
    res.json(result);
  });
};
