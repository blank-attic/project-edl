module.exports = require('express').Router().post('', function(req, res) {
  res.render('pages/ajout_structure.ejs');
  return;
});
