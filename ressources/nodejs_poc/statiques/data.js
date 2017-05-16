var ab =
  {
    "_id":"58f648bec1a21818cda1d9a3",
    "auto_icrement_id":1,
    "coordonnees":"2.4130001, 48.8535705",
    "nom":"Mairie mobile du 20ème",
    "site_web":"www.paris.fr/mairiemobile",
    "__v":0,
    "logo":"./logos/.png",
    "contacts":{"tel_fixe":"01 43 15 20 20 ou 01 43 39 75"},
    "adresse":
    {
      "numero":"",
      "voie":"place de la Porte de Montreuil",
      "code_postal":"75020",
      "secteur":"à l'échelle de l'arrondissement"
    },
    "date_ajout":"2017-04-18T17:11:26.993Z"
  }

  var a =
  {
      "_id":"58f648bec1a21818cda1d9a2",
      "auto_icrement_id":8,
      "coordonnees":"2.3989861, 48.8650884",
      "nom":"Mairie du 20ème",
      "site_web":"mairie20.paris.fr",
      "__v":0,
      "logo":"./logos/.png",
      "contacts":
      {
        "tel_fixe":"01 43 15 20 20 ou 01 43 39 75"
      },
      "adresse":
      {
        "numero":"6",
        "voie":"place Gambetta",
        "code_postal":"75020",
        "secteur":"à l'échelle de l'arrondissement"
      },
      "date_ajout":"2017-04-18T17:11:26.993Z"
  }

console.log(a.nom, a.coordonnees);

for (prop in a) {
  document.write(prop + " : " + a[prop] + '<br>' );
}

// manipulé une des associations (une des propriete) en javascript séparer une des associations.
