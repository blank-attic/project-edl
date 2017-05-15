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
var deconnexion = require('./routes/deconnexion.js');
var session_persistante = require('./models/session_persistante.js');
var session_non_persistante = require('./models/session_non_persistante.js');

var vide = require('is-empty');

app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

app.use(session({
  secret: 'secret',
  cookie: {
    domain: 'localhost',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: 'auto'
  },
  resave: true,
  saveUninitialized: true,
  rolling: true,
  sameSite: true
}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './vues'));
app.engine('html', require('ejs').renderFile);

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

app.get('/connexion', function(req, res) {
  session_non_persistante.findOne({'_id':req.sessionID}, function(err, session) {
      if (err) {
        res.render('pages/connexion.ejs', {message: 'Erreur de connexion!'});
        return;
      } else if (vide(session)) {
        session_persistante.findOne({'_id':req.sessionID}, function(err, session) {
          if (err) {
            res.render('pages/connexion.ejs', {message: 'Erreur de connexion!'});
            return;
          } else if (vide(session)) {
            res.render('pages/connexion.ejs', {message: ''});
          } else {
            res.render('pages/bienvenue.ejs', {nom_utilisateur: session.nom_paad});
            return;
          }
        });
        return;
      } else {
        res.render('pages/bienvenue.ejs', {nom_utilisateur: session.nom_paad});
        req.connection.on('close', function() {
          session_non_persistante.remove({'_id':req.sessionID}, function(err){
            if (err) {
              res.redirect('/connexion');
            } else {
              req.session.regenerate(res.render('pages/deconnexion.ejs', {message: 'Déconnexion réussie!'}));
              return;
            }
          });
        })
        return;
      }
    });
    return;
});

app.get('/reconnexion', function(req,res) {
  res.render('pages/connexion.ejs', {message: ''});
  return;
});

app.use('/statiques',express.static(path.join(__dirname,'/statiques')));

app.use('/api', bienvenue);

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname,'/index.html'));
  req.connection.on('close', function() {console.log('requête fermée'); return;})
  return;
});

app.get('/requete_ajax.js', function(req, res) {
  res.sendFile(path.join(__dirname,'/requete_ajax.js'));
});

app.get('/liste.html', function(req, res) {
  res.sendFile(path.join(__dirname,'/liste.html'));
});

app.use('/api/paad', structures);
app.use('/api/paad_ordre_alphabetique', structures_ordre_alphabetique);
app.use('/api/paad_bap', structures_bap);
app.use('/api/paad_portes_du_20eme', structures_portes_du_20);
app.use('/api/paad_arrondissement', structures_arrodissement);
connexion(app);
deconnexion(app);

app.listen(port);
console.log('En écoute sur le port ' + port);
