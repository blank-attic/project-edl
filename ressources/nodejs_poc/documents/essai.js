var paad_model = require('../models/paad_model');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

var structure = {
  _id: new mongoose.Types.ObjectId(),
  nom: 'acb',
  adresse: {
    numero: '38',
    voie: 'rue des amandiers',
    code_postal: '75020'
  },
  identifiants: {
    nom_utilisateur: 'acb',
    mot_de_passe: 'acb'
  },
  contacts: {
    tel_fixe: '01',
    tel_portable: '06',
    email: 'edemmarc@hotmail.fr'
  },
  secteur: {
    Belleville_Amandiers_Pelleport: true,
    Portes_du_20eme: false,
    echelle_arrondissement: false
  },
  services: {
    ecrivain_public_et_mediateur: true,
    e_administration: false,
    formation_au_numerique: false,
    interprete: false
  },
  coordonnees: '45 42'
};

var model = new paad_model(structure);

mongoose.connection.on('error', console.error.bind(console, 'erreur de connection à la base de données:'));

mongoose.connection.once('open', function() {
  model.save(function(err, doc) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('yeah');
      console.log(doc);
      mongoose.connection.close();
      return;
    }
  })
});
