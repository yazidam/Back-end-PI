var express = require('express');
//const Livreur = require('../../models/Livreur');
var router = express.Router();
const userModel = require('../../models/user');
const deliverymanModel = require('../../models/Livreur');

const verifAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/auth');
  }
};

router.get('/users/deliveryman/:id', verifAuth, async (req, res, next) => {
  const tablivreur = await userModel.find(
    { role: 'deliveryMan', id_company: req.params.id },
    { _id: 1, username: 1, email: 1, adresse: 1, phone: 1 }
  );
  res.send({ data: tablivreur });
});
router.delete('/users/deliveryman/:id', verifAuth, async (req, res, next) => {
  try {
    const devv = await userModel.findById(req.params.id);
    await devv.remove();
    res.send({ data: true });
  } catch (error) {
    res.status(404).send({ error: 'delivery not found try again' });
  }
});

router.patch('/users/deliveryman/:id', verifAuth, async (req, res, next) => {
  try {
    const devv = await userModel.findById(req.params.id);
    Object.assign(devv, req.body);
    devv.save();
    res.send({ data: devv });
  } catch (error) {
    res.status(404).send({ error: 'delivery not found try again' });
  }
});

router.post(
  '/users/deliveryman/add',
  verifAuth,
  async function (req, res, next) {
    const tablivreur = new userModel(req.body);
    await tablivreur.save();
    res.send({ data: tablivreur });
  }
);
router.get('/ahmed/:id', verifAuth, async (req, res, next) => {
  try {
    const tablivreur = await userModel.findById(req.params.id);
    res.send({ data: tablivreur });
  } catch (error) {
    res.status(404).send({ error: 'delivery man not found try again' });
  }
});
router.get('/users/roledeliveryman', verifAuth, async (req, res, next) => {
  const tablivreur = await userModel.find(
    { role: 'company' },
    { _id: 1, username: 1, email: 1, adresse: 1, phone: 1 }
  );
  res.send({ data: tablivreur });
});

module.exports = router;
