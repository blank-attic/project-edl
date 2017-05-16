var a=
[
  {
    "_id":1,
    "date_ajout":"2017-04-27T23:05:00.652Z",
    "date_modification":"2017-04-27T23:05:00.652Z",
    "nom":"Centre social de la 20ème chaise",
    "coordonnees":"2.3898099, 48.8648855",
    "site_web":"www.la20emechaise.org",
    "__v":0,
    "connexion":
    {
      "identifiant":"la20emechaise",
      "mot_de_passe":"la20emechaise"
    },
    "jours_ouverture":
    {
      "ecrivain_public_et_mediateur":
      {
        "vendredi":
        {
          "horaires":"10h-12h",
          "rdv":false
        },
        "jeudi":
        {
          "horaires":"10h-12h",
          "rdv":false
        },
        "mercredi":
        {
          "horaires":"10h-12h",
          "rdv":false
        },
        "mardi":
        {
          "horaires":"10h-12h",
          "rdv":false
        }
      }
    },
    "services":
    {
      "ecrivain_public_et_mediateur":true,
      "e_administration":false,
      "formation_au_numerique":false,
      "interprete":false
    },
    "logo":"./logos/.png",
    "contacts":
    {
      "tel_fixe":"01 43 49 02 49"
    },
    "adresse":
    {
      "numero":"38",
      "voie":"rue des Amandiers",
      "code_postal":"75020",
      "secteur":"Belleville-Amandiers-Pelleport"
    }
  }
  ,
  {
    "_id":1,
    "date_ajout":"2017-04-27T23:05:00.652Z",
    "date_modification":"2017-04-27T23:05:00.652Z",
    "nom":"Centre social de la 20ème chaise",
    "coordonnees":"2.3898099, 48.8648855",
    "site_web":"www.la20emechaise.org",
    "__v":0,
    "connexion":
    {
      "identifiant":"la20emechaise",
      "mot_de_passe":"la20emechaise"
    },
    "jours_ouverture":
    {
      "ecrivain_public_et_mediateur":
      {
        "vendredi":
        {
          "horaires":"10h-12h",
          "rdv":false
        },
        "jeudi":
        {
          "horaires":"10h-12h",
          "rdv":false
        },
        "mercredi":
        {
          "horaires":"10h-12h",
          "rdv":false
        },
        "mardi":
        {
          "horaires":"10h-12h",
          "rdv":false
        }
      }
    },
    "services":
    {
      "ecrivain_public_et_mediateur":true,
      "e_administration":false,
      "formation_au_numerique":false,
      "interprete":false
    },
    "logo":"./logos/.png",
    "contacts":
    {
      "tel_fixe":"01 43 49 02 49"
    },
    "adresse":
    {
      "numero":"38",
      "voie":"rue des Amandiers",
      "code_postal":"75020",
      "secteur":"Belleville-Amandiers-Pelleport"
    }
  }
]

var async = require('async');

function retrieve(a){
  var b, c, d, e, f, g;
  for (b in a){
    console.log("'"+a[b].coordonnees+"'");
    for (c in a[b]) {
      if (c=='services'){
        for (d in a[b][c]){
          if (d=='ecrivain_public_et_mediateur'){
            if (a[b][c][d]==true){
              for (e in a[b].jours_ouverture) {
                if (e=='ecrivain_public_et_mediateur') {
                  for (f in a[b].jours_ouverture[e]) {
                    for (g in a[b].jours_ouverture[e][f]) {
                      if (g=='horaires') {
                        console.log(f +' ' + ' '+ g+ ' ' + a[b].jours_ouverture[e][f][g]);
                      }
                      if (g=='rdv') {
                        console.log(f +' ' + ' '+ g+ ' ' + a[b].jours_ouverture[e][f][g]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function retrieve_2(a) {
  console.log(a.coordonnees);
  var b, c, d, e, f;
  for (b in a) {
    // console.log(a[b].coordonnees);
    if (b=='services'){
      for (c in a[b]){
        if (c=='ecrivain_public_et_mediateur'){
          if (a[b][c]==true){
            for (d in a.jours_ouverture) {
              if (d=='ecrivain_public_et_mediateur') {
                for (e in a.jours_ouverture[d]) {
                  for (f in a.jours_ouverture[d][e]) {
                    if (f=='horaires') {
                      console.log(e +' ' + ' '+ f+ ' ' + a.jours_ouverture[d][e][f]);
                    }
                    if (f=='rdv') {
                      console.log(e +' ' + ' '+ f+ ' ' + a.jours_ouverture[d][e][f]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log({'associations':a});
// retrieve(a);

// async.forEachOf(a,retrieve_2, function (err) {
//   if (err) console.log("une erreur s'est produite: "+err.message);
// });

// async.forEachOf(a,function(item){console.log(item.coordonnees);}, function (err) {
//   if (err) console.log("une erreur s'est produite: "+err.message);
// });
