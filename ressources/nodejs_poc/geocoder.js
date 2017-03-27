var OpenGeocoder = require('node-open-geocoder');

var geo = new OpenGeocoder();

geo.geocode('38 rue des amandiers, paris, france, 75020', function(err, res) {
	if (err) {
		return err;
	} else {
		// return res;
    console.log(res);
	}
});
