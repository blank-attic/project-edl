var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res, next) {
  res.json({ message: 'Quelle audace!' });
  next();
});

router.get('/toto', function(req, res, next) {
  res.json({ message: 'toto' });
  next();
});

router.get('/alert', function(req, res, next) {
    res.json({message: 'alert'});
    next();
});


router.get('/paa', function(req, res){
  // Bear.find(function(err, bears) {
  //           if (err)
  //               res.send(err);
  //
  //           res.json(bears);
  //       });
  nom_paa.find(function (err, paa) {
    if (err) { res.send (err); }
    // console.log(paa);
    res.json(paa);
  });
});

  // more routes for our API will happen here

  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/api', router);

  // START THE SERVER
  // =============================================================================
  app.listen(port);
  console.log('Magic happens on port ' + port);
  //

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/paad');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    var schema = mongoose.Schema;

    var paad_schema   = new schema({
      nom: String,
      adresse: {
        numero: Number,
        voie: String,
        code_postal: Number
      }
    });

    var nouv = mongoose.model('nouvelle_paa', paad_schema);

    var nouvelle_paad = new nouv({nom:'belleville_citoyenne', adresse: {numero: '38', voie: 'rue des amandiers', code_postal: '75020'}});

    nouvelle_paad.save(function (err) {
      if (err) { throw err; }
      console.log('quelque chose a été ajoutée à la base de données');
      console.log(nouvelle_paad);
      // mongoose.connection.close();
    });
  });
