var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment'),
timestamps = require('mongoose-timestamp'),
schema = mongoose.Schema, paad_model;

autoIncrement.initialize();

var paad_schema = new schema(
  {
    _id:
    {
      type: schema.Types.ObjectId,
      required: true
    },
    nom:
    {
      type: String,
      required: true
    },
    adresse:
    {
      numero: String,
      voie: String,
      code_postal: String,
      secteur: String
    },
    coordonnees: String,
    contacts:
    {
      tel_fixe: String,
      tel_portable: String,
      email: String
    },
    site_web: String,
    logo:
    {
      type: String,
      required: true,
      default: './logos/'
    },
    services:
    {
      ecrivain_public_et_mediateur:
      {
        type: Boolean,
        required: true
      },
      e_administration:
      {
        type: Boolean,
        required: true
      },
      formation_au_numerique:
      {
        type: Boolean,
        required: true
      },
      interprete:
      {
        type: Boolean,
        required: true
      },
    },
    jours_ouverture:
    {
      ecrivain_public_et_mediateur:
      {
        lundi:
        {
          horaires: String,
          rdv: Boolean
        },
        mardi:
        {
          horaires: String,
          rdv: Boolean
        },
        mercredi:
        {
          horaires: String,
          rdv: Boolean
        },
        jeudi:
        {
          horaires: String,
          rdv: Boolean
        },
        vendredi:
        {
          horaires: String,
          rdv: Boolean
        },
        samedi:
        {
          horaires: String,
          rdv: Boolean
        },
        dimanche:
        {
          horaires: String,
          rdv: Boolean
        }
      },
      e_administration:
      {
        lundi:
        {
          horaires: String,
          rdv: Boolean
        },
        mardi:
        {
          horaires: String,
          rdv: Boolean
        },
        mercredi:
        {
          horaires: String,
          rdv: Boolean
        },
        jeudi:
        {
          horaires: String,
          rdv: Boolean
        },
        vendredi:
        {
          horaires: String,
          rdv: Boolean
        },
        samedi:
        {
          horaires: String,
          rdv: Boolean
        },
        dimanche:
        {
          horaires: String,
          rdv: Boolean
        }
      },
      formation_au_numerique:
      {
        lundi:
        {
          horaires: String,
          rdv: Boolean
        },
        mardi:
        {
          horaires: String,
          rdv: Boolean
        },
        mercredi:
        {
          horaires: String,
          rdv: Boolean
        },
        jeudi:
        {
          horaires: String,
          rdv: Boolean
        },
        vendredi:
        {
          horaires: String,
          rdv: Boolean
        },
        samedi:
        {
          horaires: String,
          rdv: Boolean
        },
        dimanche:
        {
          horaires: String,
          rdv: Boolean
        }
      },
      interprete:
      {
        lundi:
        {
          horaires: String,
          rdv: Boolean
        },
        mardi:
        {
          horaires: String,
          rdv: Boolean
        },
        mercredi:
        {
          horaires: String,
          rdv: Boolean
        },
        jeudi:
        {
          horaires: String,
          rdv: Boolean
        },
        vendredi:
        {
          horaires: String,
          rdv: Boolean
        },
        samedi:
        {
          horaires: String,
          rdv: Boolean
        },
        dimanche:
        {
          horaires: String,
          rdv: Boolean
        }
      }
    },
    connexion:
    {
      identifiant:String,
      mot_de_passe:String
    }
  }
);

paad_schema.plugin(autoIncrement.plugin, {
    model: 'paad_collection',
    field: '_id',
    startAt: 1,
    incrementBy: 1,
    required: true
});

paad_schema.plugin(timestamps,  {
  createdAt: 'date_ajout',
  updatedAt: 'date_modification'
});

paad_schema.statics.concatenation = function(chaine_de_caractere) {
  var nouvelle_paad = new paad_model;
  return nouvelle_paad.logo+chaine_de_caractere;
};

paad_model = mongoose.model('paad_collection', paad_schema);

module.exports = paad_model;
