var OpenGeocoder = require('node-open-geocoder');

var geo = new OpenGeocoder();

var nouv = {nom:'la maison du bas belleville',
adresse: {numero: '38', voie: 'rue des amandiers', code_postal: '75020'},
logo: 'machin'
};

var lon, lat;

function lon_lat(fnc) {

  geo.geocode(nouv.adresse.numero
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
  });

}

function donnees(x) {
	nouv.adresse.longitude=x.lon;
	nouv.adresse.latitude=x.lat;
	console.log(nouv.adresse);
}

lon_lat(donnees);
