var express = require('express');
const checkboxModel = require('../../models/checkboxModel ');
const ArchiveDeliveryMan = require('../../models/Archiveciruitdeliveryman');
const Admindel = require('../../models/Admindelivery');

var router = express.Router();
const verifAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/auth');
  }
};
router.post('/add', verifAuth, async function (req, res, next) {
  const devv = new checkboxModel(req.body);
  await devv.save();
  console.log(devv);
  res.send({ data: devv });
});
router.get('/display_circuit', verifAuth, async function (req, res, next) {
  const circuitDev = await checkboxModel.find();
  res.send({ data: circuitDev });
});

router.get('/getarchives/:deliverymanId', verifAuth, async (req, res, next) => {
  const archives = await ArchiveDeliveryMan.find({
    deliverymanId: req.params.deliverymanId,
  });
  console.log('archives', archives);
  res.send({ data: archives });
});

router.delete('/gotoarchive/:id', verifAuth, async (req, res, next) => {
  try {
    const ciruit_delivery = await Admindel.findById(req.params.id);
    username = ciruit_delivery.username;
    adresse = ciruit_delivery.adresse;
    email = ciruit_delivery.email;
    phone = ciruit_delivery.phone;
    description = ciruit_delivery.description;
    from = ciruit_delivery.from;
    to = ciruit_delivery.to;
    deliverymanId = ciruit_delivery.deliverymanId;
    const archive = new ArchiveDeliveryMan({
      username,
      adresse,
      email,
      phone,
      description,
      from,
      to,
      deliverymanId,
    });
    await archive.save();
    await ciruit_delivery.remove();
    console.log('deleted ciruit_delivery', ciruit_delivery);
    console.log('deleted items', archive);

    res.send({ data: true, dataa: archive });
  } catch {
    res.status(404).send({ error: 'ciruit_delivery is not found' });
  }
});

router.delete(
  '/delete_ciruit_from_archive/:id',
  verifAuth,
  async (req, res, next) => {
    try {
      const dell = await ArchiveDeliveryMan.findById(req.params.id);
      await dell.remove();
      res.send({ data: true });
    } catch (error) {
      res.status(404).send({ error: 'delivery not found try again' });
    }
  }
);

module.exports = router;
