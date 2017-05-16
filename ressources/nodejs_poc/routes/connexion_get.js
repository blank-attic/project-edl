var session_persistante = require('../models/session_persistante.js');
var session_non_persistante = require('../models/session_non_persistante.js');
var vide = require('is-empty');

module.exports = require('express').Router().get('', function(req, res){
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
          return;
        } else {
          res.render('/bienvenue.ejs', {nom_utilisateur: session.nom_paad});
          return;
        }
      });
      return;
    } else {
      res.render('/bienvenue.ejs', {nom_utilisateur: session.nom_paad});
      req.connection.on('close', function() {
        session_non_persistante.remove({'_id':req.sessionID});
        req.session.regenerate(function() {
          return;
        });
        return;
      })
      return;
    }
  });
  return;
})
