var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ message: 'Quelle audace!' });
  next();
});

router.get('/alert', function(req, res, next) {
    res.json({message: 'alert'});
    next();
});


router.get('/paa', function(req, res){
  nouvelle_paad.find(function (err, paa) {
    if(err) res.send(err);
    console.log(paa);
    res.json(paa);
  });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

var nouvelle_paad = require('./models/paad.js');

// var schema = mongoose.Schema;
//
// var paad_schema   = new schema({
//   nom: String,
//   adresse: {
//     numero: Number,
//     voie: String,
//     code_postal: Number
//   },
//   contacts: {
//     tel_fixe: Number,
//     tel_portable: Number,
//     email: String
//   },
//   site_web: String
// });
//
// var paad = mongoose.model('paad', paad_schema);
//
// var nouvelle_paad = new paad({nom:'belleville_citoyenne',
// adresse: {numero: '38', voie: 'rue des amandiers', code_postal: '75020'},
// });
//
// nouvelle_paad.save(function (err) {
//   if (err) { throw err; }
// });

// var nouvelle = new nouvelle_paad({nom:'la maison du bas belleville',
// adresse: {numero: '10', voie: 'rue Piat', code_postal: '75020'},
// });
//
// nouvelle.save(function (err) {
//   if (err) { throw err; }
// });
