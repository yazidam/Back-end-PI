const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
  },

  adresse: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'description number required'],
  },
  from: { type: String, required: [true, 'from number required'] },
  to: { type: String, required: [true, 'to number required'] },
  deliverymanId: { type: String },
});

module.exports = mongoose.model('Archiveciruitdelivaryman', schema);
