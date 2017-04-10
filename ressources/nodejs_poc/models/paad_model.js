var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment'),
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

paad_model = mongoose.model('paad_collection', paad_schema);

module.exports = paad_model;

// var datas = [nouvelle, nouv];
// nouvelle_paads.insertMany(datas, function(error, docs) {});
