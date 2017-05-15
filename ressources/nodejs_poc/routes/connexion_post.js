var vide = require('is-empty');
var mongoose = require('mongoose').Promise = require('bluebird');
var authentification = require('../authentification/authentification.js');
var session_persistante = require('../models/session_persistante.js');
var session_non_persistante = require('../models/session_non_persistante');

module.exports = function(app) {
  app.post('/connexion', function(req, res) {
    if (vide(req.body.nom_utilisateur) || vide(req.body.mot_de_passe)) {
      res.render('pages/connexion.ejs', {message: "N'oubliez pas d'indiquez votre nom d'utilisateur et votre mot de passe!"});
      return;
    }
    authentification(req.body.nom_utilisateur,req.body.mot_de_passe, function(err,paad){
      if (err) {
        res.render('pages/connexion.ejs', {message: 'Identifiants erronés!'});
        return;
      } else {
        if (req.body.session==='true') {
          var connexion = new session_persistante({
            _id: req.sessionID,
            nom_paad: req.body.nom_utilisateur
          });
          connexion.save(function (err, doc) {
            if (err) {
              res.render('pages/connexion.ejs', {message: 'Erreur de connexion!'});
              return;
            } else {
              res.render('pages/bienvenue.ejs', {nom_utilisateur: req.body.nom_utilisateur});
              return;
            }
          });
          return;
        } else {
          var connexion = new session_non_persistante({
            _id: req.sessionID,
            nom_paad: req.body.nom_utilisateur
          });
          connexion.save(function (err, doc) {
            if (err) {
              res.render('pages/connexion.ejs', {message: 'Erreur de connexion!'});
              return;
            } else {
              res.render('pages/bienvenue.ejs', {nom_utilisateur: req.body.nom_utilisateur});
              req.connection.on('close', function() {
                session_non_persistante.remove({'_id':req.sessionID});
                req.session.regenerate(function() {
                  return;
                });
                return;
              });
              return;
            }
          });
          return;
        }
      }
    });
    return;
  });
  return;
}
