var paad_model = require('../models/paad_model.js');

module.exports = function(nom_utilisateur, mot_de_passe, fn) {
  paad_model.findOne({'identifiants.nom_utilisateur': nom_utilisateur}, function(err, paad) {
    if (err) return fn(err,null);
    else if (!paad) return fn(new Error("Nom d'utilisateur introuvable"),null);
    else {
      if (mot_de_passe!==paad.identifiants.mot_de_passe) return fn(new Error("Mot de passe erroné"),null);
      else {
        return fn(null,paad);
      }
    }
  });
}
