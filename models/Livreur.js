const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverymanSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
  },
  email: {
    type: String,
    required: [
      true,
      'Please add an email',
    ] /*required: [true, "Please add an email"],*/,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
    /*match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    unique: true,
  },*/
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  adresse: {
    type: String,
    required: [true, 'Address required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number required'],
  },
  role: {
    type: String,
    require: [true, 'unidentified role'],
    enum: ['deliveryMan'],
  },
  id_company: {
    type: String,
  },

  // role , date create , adresse
  /*userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },*/
});

module.exports = mongoose.model('deliveryman', deliverymanSchema);
