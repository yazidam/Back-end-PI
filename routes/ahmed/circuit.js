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

module.exports = router;
