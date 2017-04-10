var mongoose = require('mongoose'),
OpenGeocoder = require('node-open-geocoder'),
geo = new OpenGeocoder();

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

var paad_model = require('../models/paad_model.js');

function save(objet) {
  objet.save(function (err) {
    if (err) throw err;
    else console.log(objet);
  });
}

function donnees(objet, geocode_results, save) {
  objet.adresse.longitude = geocode_results.lon;
  objet.adresse.latitude = geocode_results.lat;
  save(objet);
}

function lon_lat(objet, fnc) {

  geo.geocode(objet.adresse.numero
		+ ', '
		+ objet.adresse.voie
		+ ', '
		+ objet.adresse.code_postal,
		function (err, res) {
		if (err) {
			return err;
		} else {
      return fnc(objet, res[0], save);
    }
  });

}

var nouvelle = new paad_model({nom:'belleville_citoyenne',
adresse: {numero: '38', voie: 'rue des Amandiers', code_postal: '75020'},
logo: paad_model.concatenation('machin')
});

lon_lat(nouvelle, donnees);
