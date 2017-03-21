var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });
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
  mon_paa.find(null, function (err, comms) {
    if (err) { throw err; }
    console.log(comms);
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

  var mongoose   = require('mongoose');
  mongoose.connect('mongodb://localhost/paad', function(err) {
    if (err) { throw err; }
  });

  var schema       = mongoose.Schema;

  var paa_schema   = new schema({
    name: String
  });

  var nom_paa = mongoose.model('nouvelle_paa', paa_schema);

  var nom = new nom_paa({name:'belleville_citoyenne'});

  nom.save(function (err) {
    if (err) { throw err; }
    console.log('quelque chose a été ajoutée à la base de données');
    mongoose.connection.close();
  });
