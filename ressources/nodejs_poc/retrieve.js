var request = require('superagent');

var url = 'localhost:8080/api';

request.get(url).end(function(err, resp){
  if (err) throw err;
  else {
    if (resp.ok == true) {
    console.log(resp);
    }
  }
});
