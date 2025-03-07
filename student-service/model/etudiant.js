const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
  nom: String,
  email: String,
  cours: [String]
});

module.exports = mongoose.model('Etudiant', etudiantSchema);
