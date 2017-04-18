var mongoose = require('mongoose'),
OpenGeocoder = require('node-open-geocoder'),
async = require('async'),
geo = new OpenGeocoder();

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

var paad_model = require('../models/paad_model.js');

function save(objet) {
  objet.save(function (err, doc) {
    if (err) return err;
    else {console.log(doc); return doc;}
  });
}

function donnees(objet, geocode_results, save) {
  objet.coordonnees = geocode_results.lon +', '+geocode_results.lat;
  save(objet);
}

function lon_lat(objet) {

  geo.geocode(objet.adresse.numero
		+ ', '
		+ objet.adresse.voie
		+ ', '
		+ objet.adresse.code_postal,
		function (err, res) {
		if (err) {
			return err;
		} else {
      if (res.length>0){
        return donnees(objet, res[0], save);
      } else {
        objet.coordonnees = "l'adresse n'a pas été géocodée";
        return save(objet);
      }
    }
  });

}

var paads = [
new paad_model({nom:'Centre social de la 20ème chaise',
adresse: {numero: '38',
voie: 'rue des Amandiers',
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
coordonnees: ' ',
logo: paad_model.concatenation('.png'),
site_web: "www.la20emechaise.org",
contacts: {tel_fixe: '01 43 49 02 49'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Centre social Archipélia',
adresse: {numero: '17',
voie: 'rue des Envierges',
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
coordonnees: ' ',
logo: paad_model.concatenation('.png'),
site_web: "www.archipelia.org",
contacts: {tel_fixe: '01 47 97 02 96'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Association culture Berbère (ACB)',
adresse: {numero: '37 bis',
voie: 'rue des Maronites',
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
coordonnees: ' ',
logo: paad_model.concatenation('.png'),
site_web: "www.acbparis.fr",
contacts: {tel_fixe: '01 43 58 23 25'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Chinois de France - Français de Chine',
adresse: {numero: '45',
voie: 'rue de Tourtille',
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
logo: paad_model.concatenation('.png'),
site_web: "www.cffc.fr",
contacts: {tel_fixe: '01 83 91 86 31'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'UNRPA ensemble & solidaires- fédération de Paris',
adresse: {numero: '14',
voie: 'rue de Tlemcen',
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
logo: paad_model.concatenation('.png'),
site_web: "www.unrpa.com/du-cote-des-federations-et-sections/cote_federations/116-paris-75-nouvelles-activites-de-la-federation.html",
contacts: {tel_fixe: '01 42 23 43 95'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Maison du bas Belleville',
adresse: {numero: '126',
voie: 'boulevard de Belleville',
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
coordonnees: ' ',
logo: paad_model.concatenation('.png'),
site_web: "maison.bas-belleville@groupe-sos.org",
contacts: {tel_fixe: '01 43 66 64 56'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'C.S relais Ménilmontant',
adresse: {numero: '85 bis',
voie: 'rue Ménilmontant',
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
logo: paad_model.concatenation('.png'),
site_web: "relaismenilmontant.jimdo.com",
contacts: {tel_fixe: '01 47 97 62 81'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Centre social CAF Annam',
adresse: {numero: '4',
voie: "rue d'Annam",
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
logo: paad_model.concatenation('.png'),
site_web: "www.caf.fr/ma-caf/caf-de-paris/points-d-accueil/centre-social-d-annam",
contacts: {tel_fixe: '01 47 97 89 19'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:"APEIS association pour l'emploi, l'information et la solidarité",
adresse: {numero: '11',
voie: "rue des Couronnes",
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
logo: paad_model.concatenation('.png'),
site_web: "",
contacts: {tel_fixe: '09 53 77 35 95'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Espace jeunes Taos Amrouche',
adresse: {numero: '50',
voie: "rue des Rigoles",
code_postal: '75020',
secteur: 'Belleville-Amandiers-Pelleport'
},
logo: paad_model.concatenation('.png'),
site_web: "www.ifac.asso.fr/espace-paris-jeunes-taos-amrouche",
contacts: {tel_fixe: '01 42 23 09 10'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Davout relais',
adresse: {numero: '30',
voie: "boulevard Davout",
code_postal: '75020',
secteur: 'Portes du 20ème '
},
logo: paad_model.concatenation('.png'),
site_web: "davout-relais.org",
contacts: {tel_fixe: '01 70 69 42 56'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Centre social Soleil Blaise',
adresse: {numero: '7',
voie: "square Vitruve",
code_postal: '75020',
secteur: 'Portes du 20ème'
},
logo: paad_model.concatenation('.png'),
site_web: "soleilblaise.free.fr",
contacts: {tel_fixe: '01 44 93 00 72'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Les médiateurs et les médiatrices du 20ème',
adresse: {numero: '157',
voie: "boulevard Davout",
code_postal: '75020',
secteur: 'Portes du 20ème'
},
logo: paad_model.concatenation('.png'),
site_web: "www.les2mdu20eme.org",
contacts: {tel_portable: '06 41 59 49 08'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Secours populaire antenne Fougères',
adresse: {numero: '3',
voie: "rue de Noisy-le-Sec",
code_postal: '75020',
secteur: 'Portes du 20ème'
},
logo: paad_model.concatenation('.png'),
site_web: "spf75.org/mots-clefs/accueil",
contacts: {tel_fixe: '01 53 41 39 39'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Centre socioculturel étincelles',
adresse: {numero: '65',
voie: "rue des Haies",
code_postal: '75020',
secteur: 'Portes du 20ème'
},
logo: paad_model.concatenation('.png'),
site_web: "etincelles20eme.org",
contacts: {tel_fixe: '01 43 71 05 45'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Espace Paris Jeunes Davout',
adresse: {numero: '94',
voie: "boulevard Davout",
code_postal: '75020',
secteur: 'Portes du 20ème'
},
logo: paad_model.concatenation('.png'),
site_web: "ifac.asso.fr/espace-paris-jeunes-davout",
contacts: {tel_fixe: '01 40 33 01 84'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Bibliothèque Louise Michel',
adresse: {numero: '29-35',
voie: "rue des Haies",
code_postal: '75020',
secteur: 'Portes du 20ème'
},
logo: paad_model.concatenation('.png'),
site_web: "biblouisemichel.wordpress.com",
contacts: {tel_fixe: '01 58 39 32 10'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'La maison des Fougères',
adresse: {numero: '10',
voie: "rue des Fougères",
code_postal: '75020',
secteur: 'Portes du 20ème'
},
logo: paad_model.concatenation('.png'),
site_web: "lamaisondesfougeres.blogpost.fr",
contacts: {tel_fixe: '09 84 41 17 05'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'PIMMS - points information médiation multiservices',
adresse: {numero: '15',
voie: "cité Champagne",
code_postal: '75020',
secteur: "à l'échelle de l'arrondissement"
},
logo: paad_model.concatenation('.png'),
site_web: "maisondesservicesaupublic.fr/content/pimms-paris-est",
contacts: {tel_fixe: '01 44 64 00 62'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:"Point d'accès au droit",
adresse: {numero: '15',
voie: "cité Champagne",
code_postal: '75020',
secteur: "à l'échelle de l'arrondissement"
},
logo: paad_model.concatenation('.png'),
site_web: "",
contacts: {tel_fixe: '01 53 27 37 40'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Mairie du 20ème',
adresse: {numero: '6',
voie: "place Gambetta",
code_postal: '75020',
secteur: "à l'échelle de l'arrondissement"
},
logo: paad_model.concatenation('.png'),
site_web: "mairie20.paris.fr",
contacts: {tel_fixe: '01 43 15 20 20 ou 01 43 39 75'},
_id: new mongoose.Types.ObjectId()
}),
new paad_model({nom:'Mairie mobile du 20ème',
adresse: {numero: '',
voie: "place de la Porte de Montreuil",
code_postal: '75020',
secteur: "à l'échelle de l'arrondissement"
},
logo: paad_model.concatenation('.png'),
site_web: "www.paris.fr/mairiemobile",
contacts: {tel_fixe: '01 43 15 20 20 ou 01 43 39 75'},
_id: new mongoose.Types.ObjectId()
})
];

async.forEachOf(paads,lon_lat, function (err) {
  if (err) console.log("une erreur s'est produite: "+err.message);
});
