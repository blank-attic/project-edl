var mongoose = require('mongoose'),
OpenGeocoder = require('node-open-geocoder'),
autoIncrement = require('mongoose-auto-increment'),
geo = new OpenGeocoder(),
schema = mongoose.Schema, paad_model;

autoIncrement.initialize();

var paad_schema = new schema({
  _id: {type: schema.Types.ObjectId, required: true, default: new mongoose.Types.ObjectId},
  date_ajout: {type: Date, required: true, default: Date.now},
  nom: String,
  adresse: {
    numero: Number,
    voie: String,
    code_postal: Number,
    latitude: Number,
    longitude: Number
  },
  contacts: {
    tel_fixe: Number,
    tel_portable: Number,
    email: String
  },
  site_web: String,
  logo: {type: String, required: true, default: './logos/'},
  resultat: String
}
);

paad_schema.plugin(autoIncrement.plugin, {
    model: 'nouvelle_paad',
    field: 'auto_icrement_id',
    startAt: 1,
    incrementBy: 1,
    required: true
});

paad_schema.statics.concatenation = function(chaine_de_caractere) {
  var nouvelle_paad = new paad_model;
  return nouvelle_paad.logo+chaine_de_caractere;
};

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

paad_model = mongoose.model('nouvelle_paad', paad_schema);

module.exports = paad_model;

var nouvelle = new paad_model({nom:'belleville_citoyenne',
adresse: {numero: '38', voie: 'rue des Amandiers', code_postal: '75020'},
logo: paad_model.concatenation('machin')
});

// lon_lat(nouvelle, donnees);

var nouv = new paad_model({nom:'la maison du bas belleville',
adresse: {numero: '40', voie: 'rue des Amandiers', code_postal: '75020'},
logo: paad_model.concatenation('machin')
});

// var datas = [nouvelle, nouv];
// nouvelle_paads.insertMany(datas, function(error, docs) {});
