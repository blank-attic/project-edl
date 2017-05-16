var vide = require('is-empty');
var session_non_persistante = require('../models/session_non_persistante.js');
var session_persistante = require('../models/session_persistante.js');

module.exports = function(app) {
  app.post('/deconnexion', function(req, res) {
    session_persistante.findOne({'_id':req.sessionID}, function(err, session) {
      if (err) {
        res.redirect('/connexion');
        return;
      } else if (vide(session)){
        session_non_persistante.findOne({'_id':req.sessionID}, function(err, session){
          if (err) {
            res.redirect('/connexion');
            return;
          } else if (vide(session)) {
            req.session.regenerate(function(err){
              if(err) {
                res.redirect('/connexion');
                return;
              } else {
                res.redirect('/connexion');
                return;
              }
            });
            return;
          } else {
            session_non_persistante.remove({'_id':req.sessionID}, function(err){
              if (err) {
                res.redirect('/connexion');
                return;
              } else {
                req.session.regenerate(function(err){
                  if(err) {
                    res.redirect('/connexion');
                    return;
                  } else {
                    res.render('pages/deconnexion.ejs', {message: 'À bientôt!'});
                    return;
                  }
                });
                return;
              }
            });
            return;
          }
        });
        return;
      } else {
        session_persistante.remove({'_id':req.sessionID}, function(err){
          if (err) {
            res.redirect('/connexion');
            return;
          } else {
            req.session.regenerate(function(err){
              if(err) {
                res.redirect('/connexion');
                return;
              } else {
                res.render('pages/deconnexion.ejs', {message: 'À bientôt!'});
                return;
              }
            });
            return;
          }
        });
        return;
      }
    });
    return;
  });
}
