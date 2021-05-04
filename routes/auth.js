var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const twilio = require('twilio');

const verifAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/auth');
  }
};

router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    adresse,
    phone,
    role,
    id_company,
  } = req.body;

  var user = await userModel.findOne({ email });

  if (user) {
    return res.status(203).send('il existe deja');
  }
  const hashedPsw = await bcrypt.hash(password, 12);

  user = new userModel({
    username,
    email,
    password: hashedPsw,
    adresse,
    phone,
    role,
    id_company,
  });
  try {
    // var client = new twilio(
    //   'AC4bdb76fef466fad0b893541c46dc27b2',
    //   'a3d4dc7f24d5cda12a485c86584ac7a9'
    // );
    // client.messages.create({
    //   to: '+21625535312',
    //   from: '+14013292102 ',
    //   body: 'your delivery Man Added successfully',
    // });
    await user.save();
    res.send('user enregistrer ');
  } catch (err) {
    res.status(203).send(err.message);
  }
});

router.get('/', async (req, res) => {
  res.status(203).send('you must login for enter');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    //return res.send("vous n'etes pas enregistrer");
    return res.status(203).send("vous n'etes pas enregistrer");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(203).send('mot de passe incorrecte');
  }
  req.session.user = {
    id: user._id,
    username: user.username,
    email: user.email,
    adresse: user.adresse,
    phone: user.phone,
    role: user.role,
    id_company: user.id_company,
  };
  req.session.isAuth = true;
  req.session.compteur = 0;
  //res.redirect('/dashboard')
  //res.send('you are connected now')
  res.send(req.session.user);
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    user = { role: 'visiteur' };
    res.send(user);
  });
});

module.exports = router;
