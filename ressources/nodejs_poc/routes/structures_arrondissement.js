var express = require('express');
var router = express.Router();

var paad_model = require('../models/paad_model.js');

router.get('', function(req, res){
  paad_model.find({"secteur.echelle_arrondissement": true} , function (err, paad) {
    if(err) res.send(err);
    else {
      res
      .header('Access-Control-Allow-Origin', 'localhost')
      .header('Access-Control-Allow-Methods', 'GET')
      .header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
      .status(200)
      .json(paad);
    }
  }).select({identifiants:0, _id:0, __v:0});
});

module.exports = router;
