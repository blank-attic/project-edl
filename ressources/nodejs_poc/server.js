var app = require('express')();

var vide = require('is-empty');

app.use(require('body-parser').urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

app.use(require('./routes/session.js'));

app.set('view engine', 'ejs');
app.set('views', require('path').join(__dirname, '/vues'));
app.engine('html', require('ejs').renderFile);

app.use('',require('express').static(require('path').join(__dirname,'/statiques')));

require('mongoose').connect('mongodb://localhost/permanence_acces_aux_droits');

app.use('/connexion', require('./routes/connexion_get.js'));
require('./routes/connexion_post.js')(app);
require('./routes/deconnexion.js')(app);
app.use('/ajout', require('./routes/ajout_structure.js'));
require('./routes/nouvelle_structure.js')(app);

app.get('/requete_ajax', function(req, res) {
  res.sendFile(require('path').join(__dirname,'/index.html'));
  return;
});

app.get('/requete_ajax.js', function(req, res) {
  res.sendFile(require('path').join(__dirname,'/requete_ajax.js'));
});

app.use('/api', require('./routes/bienvenue.js'));
app.use('/api/paad', require('./routes/structures.js'));
app.use('/api/paad_ordre_alphabetique', require('./routes/structures_ordre_alphabetique.js'));
app.use('/api/paad_bap', require('./routes/structures_bap.js'));
app.use('/api/paad_portes_du_20eme', require('./routes/structures_portes_du_20eme.js'));
app.use('/api/paad_arrondissement', require('./routes/structures_arrondissement.js'));

app.listen(port);
console.log('En écoute sur le port ' + port);
