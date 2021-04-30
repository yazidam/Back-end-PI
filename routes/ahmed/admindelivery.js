var express = require('express');
const Admindel = require('../../models/Admindelivery');
var router = express.Router();
const verifAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/auth');
  }
};

router.get(
  '/all/deliveryman/package/from/:deliverymanId',
  verifAuth,
  async function (req, res, next) {
    const admintab = await Admindel.find(
      {
        deliverymanId: req.params.deliverymanId,
      },
      { _id: 0, from: 1 }
    );
    res.send({ data: admintab });
  }
);

router.delete('/deliverymanpackage/:id', verifAuth, async (req, res, next) => {
  try {
    const devv = await Admindel.findById(req.params.id);
    await devv.remove();
    res.send({ data: true });
  } catch (error) {
    res.status(404).send({ error: 'delivery not found try again' });
  }
});

router.post('/add', verifAuth, async function (req, res, next) {
  try {
    const admintab = new Admindel(req.body);
    await admintab.save();
    console.log(admintab);
    res.send({ data: admintab });
  } catch (error) {
    res.status(404).send({ error: 'ghalta' });
  }
});
router.get(
  '/all/deliveryman/package/to/:deliverymanId',
  verifAuth,
  async function (req, res, next) {
    const admintab = await Admindel.find(
      {
        deliverymanId: req.params.deliverymanId,
      },
      { _id: 0, to: 1 }
    );
    res.send({ data: admintab });
  }
);
router.get(
  '/all/deliveryman/package/:deliverymanId',
  verifAuth,
  async function (req, res, next) {
    const admintab = await Admindel.find({
      deliverymanId: req.params.deliverymanId,
    });
    console.log(admintab);

    res.send({ data: admintab });
  }
);
// router.delete('/admindev/:id', async (req, res, next) => {
//   try {
//     const admintab = await Admindel.findById(req.params.id);
//     await admintab.remove();
//     res.send({ data: true });
//   } catch (error) {
//     res.status(404).send({ error: 'delivery not found try again' });
//   }
// });
// router.patch('/admindel/:id', async (req, res, next) => {
//   try {
//     const admintab = await Delivery.findById(req.params.id);
//     // const devv1 = await Admindel.findById(req.params.id);
//     Object.assign(devv, req.body);
//     devv.save();
//     res.send({ data: devv });
//   } catch (error) {
//     res.status(404).send({ error: 'delivery not found try again' });
//   }
// });

module.exports = router;
