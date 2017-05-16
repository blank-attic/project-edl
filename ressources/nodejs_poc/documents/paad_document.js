var mongoose = require('mongoose'),
geocodeur = require('search-osm-geocode'),
vide = require('is-empty'),
paad_model = require('../models/paad_model.js');

mongoose.Promise = require('bluebird');

var paads = [
  {
    _id: new mongoose.Types.ObjectId(),
    nom: 'Centre social de la 20ème chaise',
    adresse: {
      numero: '38',
      voie: 'rue des Amandiers',
      code_postal: '75020'
    },
    secteur: {
      Belleville_Amandiers_Pelleport: true,
      Portes_du_20eme: false,
      echelle_arrondissement: false
    },
    contacts: {
      tel_fixe: '01 43 49 02 49'
    },
    site_web: 'http://www.la20emechaise.org',
    logo: paad_model.concatenation('.png'),
    identifiants: {
      nom_utilisateur: 'la20èmechaise',
      mot_de_passe: 'la20èmechaise'
    },
    services: {
      ecrivain_public_et_mediateur: true,
      e_administration: false,
      formation_au_numerique: false,
      interprete: false
    },
    jours_ouverture: {
      ecrivain_public_et_mediateur: {
        mardi: {
          horaires: '10h-12h',
          rdv: false
        },
        mercredi: {
          horaires: '10h-12h',
          rdv: false
        },
        jeudi: {
          horaires: '10h-12h',
          rdv: false
        },
        vendredi: {
          horaires: '10h-12h',
          rdv: false
        }
      }
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nom: 'Centre social Archipélia',
    adresse: {
      numero: '17',
      voie: 'rue des Envierges',
      code_postal: '75020'
    },
    secteur: {
      Belleville_Amandiers_Pelleport: true,
      Portes_du_20eme: false,
      echelle_arrondissement: false
    },
    contacts: {
      tel_fixe: '01 47 97 02 96',
      email: 'info@archipelia.org'
    },
    site_web: 'https://www.archipelia.org',
    logo: paad_model.concatenation('.png'),
    identifiants: {
      nom_utilisateur: 'archipélia',
      mot_de_passe: 'archipélia'
    },
    services: {
      ecrivain_public_et_mediateur: true,
      e_administration: true,
      formation_au_numerique: false,
      interprete: false
    },
    jours_ouverture: {
      ecrivain_public_et_mediateur: {
        lundi: {
          horaires: '18h-20h',
          rdv: false
        },
        mardi: {
          horaires: '10h-12h30',
          rdv: false
        },
        vendredi: {
          horaires: '10h-12h30',
          rdv: false
        }
      },
      e_administration: {
        mercredi: {
          horaires: '10-12h',
          rdv: false
        }
      }
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nom: 'Association culture berbère - ACB',
    adresse: {
      numero: '37 bis',
      voie: 'rue des Maronites',
      code_postal: '75020'
    },
    secteur: {
      Belleville_Amandiers_Pelleport: true,
      Portes_du_20eme: false,
      echelle_arrondissement: false
    },
    contacts: {
      tel_fixe: '01 43 58 23 25',
      email: 'contact@acbparis.org'
    },
    site_web: 'https://www.acbparis.org/',
    logo: paad_model.concatenation('.png'),
    identifiants: {
      nom_utilisateur: 'acb',
      mot_de_passe: 'acb'
    },
    services: {
      ecrivain_public_et_mediateur: true,
      e_administration: true,
      formation_au_numerique: true,
      interprete: false
    },
    jours_ouverture: {
      ecrivain_public_et_mediateur: {
        lundi: {
          horaires: '14h-17h',
          rdv: true
        },
        vendredi: {
          horaires: 'après-midi',
          rdv: true
        }
      },
      formation_au_numerique: {
        jeudi: {
          horaires: '10-12h',
          rdv: true
        }
      },
      e_administration: {
        jeudi: {
          horaires: '11h30-12h',
          rdv: true
        }
      }
    }
  }
];

function insertion_bdd(paad) {
  var model = new paad_model(paad);
  model.save(function (err, doc) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log(doc);
      mongoose.connection.close();
      return;
    }
  });
}

function ajout_coordonnees(paad, resultats_geocodage) {
  paad.coordonnees = resultats_geocodage.latitude +', '+resultats_geocodage.longitude;
  return insertion_bdd(paad);
}

function lat_lon(paad) {
  geocodeur.geocode(paad.adresse.numero
		+ ', '
		+ paad.adresse.voie
		+ ', '
		+ paad.adresse.code_postal,
		function (err, res) {
		if (err) {
			return err;
		} else {
      if (res.length>0){
        return ajout_coordonnees(paad, res[0]);
      } else {
        paad.coordonnees = "l'adresse n'a pas été géocodée";
        return insertion_bdd(paad);
      }
    }
  });
}

function disponibilites(paad) {
  return new Promise(function(resolve, reject){
    var erreur = '';
    if (paad.services.ecrivain_public_et_mediateur === true ) {
      if (vide(paad.jours_ouverture) === true ) {
        erreur ="N'oubliez pas d'indiquer les jours d'ouverture de la structure suivante: " +paad.nom+ "!";
      } else {
        if (vide(paad.jours_ouverture.ecrivain_public_et_mediateur) === true) {
          if (vide(erreur)===true) {
            erreur = "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: écrivain public et médiateur!";
          } else {
            erreur = erreur + ' ' + "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: écrivain public et médiateur!";
          }
        }
      }
    }
    if (paad.services.e_administration === true ) {
      if (vide(paad.jours_ouverture) === true) {
        erreur ="N'oubliez pas d'indiquer les jours d'ouverture de la structure suivante: " +paad.nom+ "!";
      } else {
        if (vide(paad.jours_ouverture.e_administration) === true) {
          if (vide(erreur)===true) {
            erreur = "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: e-administration!";
          } else {
            erreur = erreur + ' ' + "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: e-administration!";
          }
        }
      }
    }
    if (paad.services.formation_au_numerique === true ) {
      if (vide(paad.jours_ouverture) === true) {
        erreur ="N'oubliez pas d'indiquer les jours d'ouverture de la structure suivante: " +paad.nom+ "!";
      } else {
        if (vide(paad.jours_ouverture.formation_au_numerique) === true) {
          if (vide(erreur)===true) {
            erreur = "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: formation au numérique!";
          } else {
            erreur = erreur + ' ' + "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: formation au numérique!";
          }
        }
      }
    }
    if (paad.services.interprete === true ) {
      if (vide(paad.jours_ouverture) === true) {
        erreur ="N'oubliez pas d'indiquer les jours d'ouverture de la structure suivante: " +paad.nom+ "!";
      } else {
        if (vide(paad.jours_ouverture.interprete) === true) {
          if (vide(erreur)===true) {
            erreur = "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: interprete!";
          } else {
            erreur = erreur + ' ' + "N'oubliez pas d'indiquer pour la structure, " +paad.nom+ ", les jours où est proposé le service suivant: interprete!";
          }
        }
      }
    }
    if (vide(erreur)===false) {
      reject(erreur);
    }
    resolve(paad);
  });
}

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

mongoose.connection.on('error', console.error.bind(console, 'erreur de connection à la base de données:'));

mongoose.connection.once('open', function() {
  var paads_promises = paads.map(disponibilites);
  paads_promises.forEach(function(promise_actuelle){
    Promise
    .resolve()
    .then(function(){
      return promise_actuelle;
    })
    .then(function(paad) {
      lat_lon(paad);
    })
    .catch(function(erreur){
      console.log(erreur);
    });
  });
});
