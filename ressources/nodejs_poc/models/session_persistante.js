var mongoose = require('mongoose'),
timestamps = require('mongoose-timestamp'),
schema = mongoose.Schema,
session_persistante;

var session_schema = new schema({
  _id: {
    type: String,
    required: true
  },
  nom_paad: {
    type: String,
    required: true
  }
});

session_schema.plugin(timestamps,  {
  createdAt: 'date_ajout',
  updatedAt: 'date_modification'
});

session_persistante = mongoose.model('session_persistante', session_schema);

module.exports = session_persistante;
