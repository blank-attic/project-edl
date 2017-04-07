var mongoose = require('mongoose'),
OpenGeocoder = require('node-open-geocoder'),
geo = new OpenGeocoder(),
schema = mongoose.Schema, paad_model;

var paad_schema   = new schema({
  nom: String,
  adresse: {
    numero: Number,
    voie: String,
    code_postal: Number
  },
  contacts: {
    tel_fixe: Number,
    tel_portable: Number,
    email: String
  },
  site_web: String
});

// paad_schema.methods.geocode = function() {
//   geo.geocode('38 rue des amandiers, 75020', function(err, res) {
//   	if (err) {
//   		return err;
//   	} else {
//   		// return res;
//       // console.log(res[0].display_name);
//   		// console.log(res);
//       return res[0].display_name;
//   	}
//   });
// }

paad_model = mongoose.model('nouvelle_paad', paad_schema);

// paad_model.schema = paad_schema;

module.exports = paad_model;

var nouvelle = new paad_model({nom:'la maison du bas belleville',
adresse: {numero: '10', voie: 'rue Piat', code_postal: '75020'},
});

nouvelle.save(function (err) {
  if (err) { throw err; }
});
