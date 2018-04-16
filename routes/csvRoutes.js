'use strict';
module.exports = function(app) {
  var csvController = require('../controllers/csvController');

  // stockExchage Route
  app.route('/update').post(csvController.add_temp_hum);
  app.route('/getTempHum').post(csvController.get_data_N);
};
