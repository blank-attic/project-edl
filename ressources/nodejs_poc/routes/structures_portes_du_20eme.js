var express = require('express');
var router = express.Router();

var paad_model = require('../models/paad_model.js');

router.get('', function(req, res){
  paad_model.find({'adresse.secteur':'Portes du 20ème'} , function (err, paad) {
    if(err) res.send(err);
    else {
      res
      .header('Access-Control-Allow-Origin', '*')
      .header('Access-Control-Allow-Methods', 'GET')
      .header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
      .status(200)
      .json(paad);
    }
  });
});

module.exports = router;
