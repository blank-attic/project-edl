var express = require('express');
var router = express.Router();

var paad_model = require('../models/paad_model.js');

router.get('', function(req, res){
  paad_model.find(function (err, paad) {
    if(err) res.send(err);
    else res.json(paad);
  });
});

module.exports = router;
