var authentification = require('../authentification/authentification.js');
var mongoose = require('mongoose').Promise = require('bluebird');
var session_model = require('../models/session_model.js');

function verif(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

module.exports = function(app) {
  app.post('/connexion.html', function(req, res) {
    authentification(req.body.nom_utilisateur,req.body.mot_de_passe, function(err,paad){
      if (err) {
        res.redirect('connexion.html');
        return;
      } else {
        req.session.regenerate(function(err) {
          if (err) res.redirect('connexion.html');
          else {
            var connexion = new session_model({
              _id: req.sessionID,
              nom_paad: req.body.nom_utilisateur
            });
            connexion.save(function (err, doc) {
              if (err) {
                res.redirect('connexion.html');
                return;
              } else {
                res.redirect('bienvenue.html');
                return;
              }
            });
          }
        });
      }
    });
  });
}
