var mongoose = require('mongoose'),
timestamps = require('mongoose-timestamp'),
type_email = require('mongoose-type-mail'),
validateurs = require('mongoose-validators'),
schema = mongoose.Schema,
paad_model;

var paad_schema = new schema({
  _id: {
    type: schema.Types.ObjectId,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  adresse: {
    numero: String,
    voie: String,
    code_postal: String
  },
  secteur: {
    Belleville_Amandiers_Pelleport: {
      type: Boolean,
      required: true
    },
    Portes_du_20eme: {
      type: Boolean,
      required: true
    },
    echelle_arrondissement: {
      type: Boolean,
      required: true
    }
  },
  coordonnees: String,
  contacts: {
    tel_fixe: String,
    tel_portable: String,
    email: {
      type: type_email
    }
  },
  site_web: {
    type: String,
    validate: validateurs.isURL()
  },
  logo: {
    type: String,
    default: '/logos/',
    required: true
  },
  identifiants: {
    nom_utilisateur: {
      type: String,
      required: true
    },
    mot_de_passe: {
      type: String,
      required: true
    }
  },
  services:{
    ecrivain_public_et_mediateur: {
      type: Boolean,
      default: false,
      required: true
    },
    e_administration: {
      type: Boolean,
      default: false,
      required: true
    },
    formation_au_numerique: {
      type: Boolean,
      default: false,
      required: true
    },
    interprete: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  jours_ouverture: {
    ecrivain_public_et_mediateur: {
      lundi: {
        horaires: String,
        rdv: Boolean
      },
      mardi: {
        horaires: String,
        rdv: Boolean
      },
      mercredi: {
        horaires: String,
        rdv: Boolean
      },
      jeudi: {
        horaires: String,
        rdv: Boolean
      },
      vendredi: {
        horaires: String,
        rdv: Boolean
      },
      samedi: {
        horaires: String,
        rdv: Boolean
      },
      dimanche: {
        horaires: String,
        rdv: Boolean
      }
    },
    e_administration: {
      lundi: {
        horaires: String,
        rdv: Boolean
      },
      mardi: {
        horaires: String,
        rdv: Boolean
      },
      mercredi: {
        horaires: String,
        rdv: Boolean
      },
      jeudi: {
        horaires: String,
        rdv: Boolean
      },
      vendredi: {
        horaires: String,
        rdv: Boolean
      },
      samedi: {
        horaires: String,
        rdv: Boolean
      },
      dimanche: {
        horaires: String,
        rdv: Boolean
      }
    },
    formation_au_numerique: {
      lundi: {
        horaires: String,
        rdv: Boolean
      },
      mardi: {
        horaires: String,
        rdv: Boolean
      },
      mercredi: {
        horaires: String,
        rdv: Boolean
      },
      jeudi: {
        horaires: String,
        rdv: Boolean
      },
      vendredi: {
        horaires: String,
        rdv: Boolean
      },
      samedi: {
        horaires: String,
        rdv: Boolean
      },
      dimanche: {
        horaires: String,
        rdv: Boolean
      }
    },
    interprete: {
      lundi: {
        horaires: String,
        rdv: Boolean
      },
      mardi: {
        horaires: String,
        rdv: Boolean
      },
      mercredi: {
        horaires: String,
        rdv: Boolean
      },
      jeudi: {
        horaires: String,
        rdv: Boolean
      },
      vendredi: {
        horaires: String,
        rdv: Boolean
      },
      samedi: {
        horaires: String,
        rdv: Boolean
      },
      dimanche: {
        horaires: String,
        rdv: Boolean
      }
    }
  }
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
