var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ message: "Bienvenue sur l'API des permanences d'accès aux droits du 20ème!" });
  next();
});

router.get('/paad', function(req, res){
  paad_model.find(function (err, paa) {
    if(err) res.send(err);
    res.json(paa);
  });
});

app.use('/api', router);

app.listen(port);
console.log('En écoute sur le port ' + port);

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

var paad_model = require('./models/paad_model.js');
