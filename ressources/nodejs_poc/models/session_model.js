var mongoose = require('mongoose'),
timestamps = require('mongoose-timestamp'),
schema = mongoose.Schema,
session_model;

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

session_model = mongoose.model('session_collection', session_schema);

module.exports = session_model;
