const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  modele: String,
  marque: String,
  image: String,
  deleted: { type: Boolean, default: false },
  userId: String,
});

module.exports = mongoose.model('Vehicule', schema);
