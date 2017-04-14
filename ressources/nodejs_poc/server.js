var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var bienvenue = require('./routes/bienvenue.js');
var structures = require('./routes/structures.js');
var structures_ordre_alphabetique = require('./routes/structures_ordre_alphabetique.js');
var structures_bap = require('./routes/structures_bap.js');
var structures_portes_du_20 = require('./routes/structures_portes_du_20eme.js');
var structures_arrodissement = require('./routes/structures_arrondissement.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use('/api', bienvenue);

mongoose.connect('mongodb://localhost/permanence_acces_aux_droits');

app.use('/api/paad', structures);
app.use('/api/paad_ordre_alphabetique', structures_ordre_alphabetique);
app.use('/api/paad_bap', structures_bap);
app.use('/api/paad_portes_du_20eme', structures_portes_du_20);
app.use('/api/paad_arrondissement', structures_arrodissement);

app.listen(port);
console.log('En écoute sur le port ' + port);
