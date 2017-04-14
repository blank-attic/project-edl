var geocoder = require('search-osm-geocode');

var options = {
  'accept-language': 'fr'
};

var nouv = {nom:'la maison du bas belleville',
adresse: {numero: '126',
voie: 'boulevard de belleville',
code_postal: '75020'
},
};

function lon_lat(fnc) {

  geocoder.geocode(nouv.adresse.numero
		+ ', '
		+ nouv.adresse.voie
		+ ', '
		+ nouv.adresse.code_postal,
    function (err, res) {
		if (err) {
			return err;
		} else {
      if (res.length>0){
        fnc(res[0]);
      } else console.log("L'adresse n'a pas été géocodée");
    }
  },
    options
  );

}

function donnees(x) {
  nouv.adresse.longitude=x.longitude;
  nouv.adresse.latitude=x.latitude;
  console.log(nouv.adresse);
}

lon_lat(donnees);
