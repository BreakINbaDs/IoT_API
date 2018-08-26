'use strict';
module.exports = function(app) {
  var csvController = require('../controllers/csvController');

  // stockExchage Route
  app.route('/api/v1/sensor').post(csvController.sensor_info);
  app.route('/api/v1/sensor/:id/:room/:limit').get(csvController.get_data);
  app.route('/api/v1/auth').post(csvController.auth);
  app.route('/api/v1/login').post(csvController.login);
};
