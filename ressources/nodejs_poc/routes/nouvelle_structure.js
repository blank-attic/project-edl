var vide = require('is-empty');
var mongoose = require('mongoose');
var paad_model = require('../models/paad_model.js');

mongoose.Promise = require('bluebird');

module.exports = function(app) {
  app.post('/nouvelle_structure', function(req, res) {
    var structure = {
      _id: new mongoose.Types.ObjectId(),
      nom: req.body.nom,
      adresse: {
        numero: req.body.numero,
        voie: req.body.voie,
        code_postal: req.body.code_postal
      },
      secteur: {
        Belleville_Amandiers_Pelleport: false,
        Portes_du_20eme: false,
        echelle_arrondissement: false
      },
      coordonnees: req.body.latitude+' '+req.body.longitude,
      identifiants: {
        nom_utilisateur: req.body.nom_utilisateur,
        mot_de_passe: req.body.mot_de_passe
      },
      services: {
        ecrivain_public_et_mediateur: false,
        e_administration: false,
        formation_au_numerique: false,
        interprete: false,
      },
      site_web: ' ',
      contacts: {

      }
    };

    if(req.body.secteur==='bap') {
      structure.secteur.Belleville_Amandiers_Pelleport=true;
    }
    if(req.body.secteur==='arrondissement') {
      structure.secteur.echelle_arrondissement=true;
    }
    if(req.body.secteur==='portes') {
      structure.secteur.Portes_du_20eme=true;
    }

    if(req.body.ecrivain==='on') {
      structure.services.ecrivain_public_et_mediateur=true;
    }
    if(req.body.administration==='on') {
      structure.services.e_administration=true;
    }
    if(req.body.formation==='on') {
      structure.services.formation_au_numerique=true;
    }
    if(req.body.interprete==='on') {
      structure.services.interprete=true;
    }

    if(!vide(req.body.site)){
      structure.site_web=req.body.site;
    }

    if(!vide(req.body.tel_fixe)) {
      structure.contacts['tel_fixe']=req.body.tel_fixe;
    }
    if(!vide(req.body.tel_portable)) {
      structure.contacts['tel_portable']=req.body.tel_portable;
    }
    if(!vide(req.body.email)) {
      structure.contacts['email']=req.body.email;
    }

    var model = new paad_model(structure);
    model.save(function(err, doc) {
      if (err) {
        res.redirect('/bienvenue');
        return;
      } else {
        res.render('pages/confirmation_ajout.ejs', {nom_utilisateur: doc.nom, coordonnees: doc.coordonnees});
        return;
      }
    });
    return;
  });
  return;
}
