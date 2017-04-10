var geocoder = require('search-osm-geocode');

var options = {
  'accept-language': 'fr'
};

var nouv = {nom:'la maison du bas belleville',
adresse: {numero: '38', voie: 'rue des amandiers', code_postal: '75020'},
logo: 'machin'
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
      console.log(res);
      return fnc(res[0]);
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

// geocoder.geocode(nouv.adresse.numero
//   + ', '
//   + nouv.adresse.voie
//   + ', '
//   + nouv.adresse.code_postal,
//   function callback (error, result) {
//     if (error) return error;
//     else console.log(result);
//   },
//   options
// );
