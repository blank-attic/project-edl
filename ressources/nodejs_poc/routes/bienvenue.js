var express = require('express');
var router = express.Router();

router.get('', function(req, res) {
  res
  .header('Access-Control-Allow-Origin', '*')
  .header('Access-Control-Allow-Methods', 'GET')
  .header('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept')
  .status(200)
  .send("Bienvenue sur l'API des permanences d'accès aux droits du 20ème!");
});

module.exports = router;
