var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var bienvenue = require('./routes/bienvenue.js');
var structures = require('./routes/structures.js');
var structures_ordre_alphabetique = require('./routes/structures_ordre_alphabetique.js');
var structures_bap = require('./routes/structures_bap.js');
var structures_portes_du_20 = require('./routes/structures_portes_du_20eme.js');
var structures_arrodissement = require('./routes/structures_arrondissement.js');
var connexion = require('./routes/connexion.js');

app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

app.use(session({
  secret: 'secret',
  cookie: {
    domain: 'localhost',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: 'auto'
  },
  resave: true,
  saveUninitialized: true,
  rolling: true,
  sameSite: true
}));

app.get('/connexion.html', function(req, res) {
  res.sendFile(path.join(__dirname,'connexion.html'));
});

app.use('/statiques',express.static(path.join(__dirname,'/statiques')));

app.use('/api', bienvenue);

app.get('/index.html', function(req, res) {
  console.log(req.session);
  res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/bienvenue.html', function(req, res) {
  res.sendFile(path.join(__dirname,'/bienvenue.html'));
});

app.get('/requete_ajax.js', function(req, res) {
  res.sendFile(path.join(__dirname,'/requete_ajax.js'));
});

app.get('/liste.html', function(req, res) {
  res.sendFile(path.join(__dirname,'/liste.html'));
});

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

app.use('/api/paad', structures);
app.use('/api/paad_ordre_alphabetique', structures_ordre_alphabetique);
app.use('/api/paad_bap', structures_bap);
app.use('/api/paad_portes_du_20eme', structures_portes_du_20);
app.use('/api/paad_arrondissement', structures_arrodissement);
connexion(app);

app.listen(port);
console.log('En écoute sur le port ' + port);
