var OpenGeocoder = require('node-open-geocoder');

var geo = new OpenGeocoder();

geo.geocode('38 rue des amandiers 75020, Paris, France', function(err, res) {
	if (err) {
		return err;
	} else {
		// return res;
    console.log(res[0].display_name);
		// console.log()
	}
});
