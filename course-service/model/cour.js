const mongoose = require('mongoose');

const coursSchema = new mongoose.Schema({
  titre: String,
  professeur_id: String,
  description: String,
  prix: Number
});

module.exports = mongoose.model('Cour', coursSchema);
