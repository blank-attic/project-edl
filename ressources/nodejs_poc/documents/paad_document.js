var mongoose = require('mongoose'),
OpenGeocoder = require('node-open-geocoder'),
async = require('async'),
geo = new OpenGeocoder();

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

var paad_model = require('../models/paad_model.js');

function save(paad) {
  paad.save(function (err, doc) {
    if (err) return err;
    else {console.log(doc); return doc;}
  });
}

function donnees(paad, geocode_results, save) {
  paad.coordonnees = geocode_results.lat +', '+geocode_results.lon;
  save(paad);
}

function lon_lat(paad) {

  geo.geocode(paad.adresse.numero
		+ ', '
		+ paad.adresse.voie
		+ ', '
		+ paad.adresse.code_postal,
		function (err, res) {
		if (err) {
			return err;
		} else {
      if (res.length>0){
        return donnees(paad, res[0], save);
      } else {
        paad.coordonnees = "l'adresse n'a pas été géocodée";
        return save(paad);
      }
    }
  });

}

// function jours_ouverture(paad) {
//   var a;
//   var b;
//   var c;
//   // var d;
//   for (a in paad ) {
//     if (paad[a]=='services') {
//       for (b in paad[a]) {
//         for (c in paad[a][b]){
//           if (paad[a][b][c]=='disponibilites') {
//             console.log(paad[a][b][c]);
//           }
//         }
//       }
//     }
//   }
// }

var paads = [
  new paad_model(
    {
      nom:'Centre social de la 20ème chaise',
      adresse:
      {
        numero: '38',
        voie: 'rue des Amandiers',
        code_postal: '75020',
        secteur: 'Belleville-Amandiers-Pelleport'
      },
      coordonnees: ' ',
      logo: paad_model.concatenation('.png'),
      site_web: "www.la20emechaise.org",
      contacts:
      {
        tel_fixe: '01 43 49 02 49'
      },
      services:
      {
        ecrivain_public_et_mediateur: true,
        e_administration: false,
        formation_au_numerique: false,
        interprete: false
      },
      jours_ouverture:
      {
        ecrivain_public_et_mediateur:
        {
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
      },
      connexion:
      {
        identifiant:'la20emechaise',
        mot_de_passe: 'la20emechaise'
      }
    }
  ),
  new paad_model(
    {
      nom:'Centre social Soleil Blaise',
      adresse:
      {
        numero: '7',
        voie: 'square Vitruve',
        code_postal: '75020',
        secteur: 'Portes du 20ème'
      },
      coordonnees: ' ',
      logo: paad_model.concatenation('.png'),
      site_web: "soleilblaise.free.fr",
      contacts:
      {
        tel_fixe: '01 44 93 00 72'
      },
      services:
      {
        ecrivain_public_et_mediateur: true,
        e_administration: true,
        formation_au_numerique: false,
        interprete: false
      },
      jours_ouverture:
      {
        ecrivain_public_et_mediateur:
        {
          lundi: {
            horaires: '18h30-20h30',
            rdv: false
          },
          mercredi: {
            horaires: '10h-12h30',
            rdv: false
          },
          samedi: {
            horaires: '10h-12h30',
            rdv: false
          }
        },
        e_administration:
        {
          mercredi: {
            horaires: '10h-12h30',
            rdv: false
          }
        }
      },
      connexion:
      {
        identifiant:'soleilblaise',
        mot_de_passe: 'soleilblaise'
      }
    }
  ),
  new paad_model(
    {
      nom:'Mairie mobile de Paris',
      adresse:
      {
        numero: ' ',
        voie: 'Place de la Porte de Montreuil',
        code_postal: '75020',
        secteur: "à l'échelle de l'arrondissement"
      },
      coordonnees: ' ',
      logo: paad_model.concatenation('.png'),
      site_web: "paris.fr/mairiemobile",
      contacts:
      {
        tel_fixe: ' '
      },
      services:
      {
        ecrivain_public_et_mediateur: true,
        e_administration: true,
        formation_au_numerique: false,
        interprete: false
      },
      jours_ouverture:
      {
        ecrivain_public_et_mediateur:
        {
          lundi: {
            horaires: '9h30-17h',
            rdv: false
          }
        },
        e_administration:
        {
          lundi: {
            horaires: '9h30-17h',
            rdv: false
          }
        },
      },
      connexion:
      {
        identifiant:'mairiemobile',
        mot_de_passe: 'mairiemobile'
      }
    }
  )
];

async.forEachOf(paads,lon_lat, function (err) {
  if (err) console.log("une erreur s'est produite: "+err.message);
});
