var express = require('express');
const Delivery = require('../../models/Delivery');
const checkboxModel = require('../../models/checkboxModel ');
var router = express.Router();
const twilio = require('twilio');
var TMClient = require('textmagic-rest-client');
const Vonage = require('@vonage/server-sdk');
const Nexmo = require('nexmo');

const verifAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/auth');
  }
};

router.post('/add', verifAuth, async function (req, res, next) {
  const devv = new Delivery(req.body);
  await devv.save();

  res.send({ data: devv });
  // { data: devv },
});

router.get('/twilio', verifAuth, async function (req, res) {
  var client = new twilio(
    'AC4bdb76fef466fad0b893541c46dc27b2',
    'a3d4dc7f24d5cda12a485c86584ac7a9'
  );
  client.messages.create({
    to: '+21625535312',
    from: '+14013292102 ',
    body: 'your delivery passed',
  });
  // const nexmo = new Nexmo({
  //   apiKey: 'd846fdba',
  //   apiSecret: 'N8GrKDkhocKXNuiS',
  // });

  // Initialize with sender and reciever
  // mobile number with text message
  // const from = 'sender_name';
  // const to = '25535312';
  // const text = 'Greetings from Geeksforgeeks';

  // nexmo.message.sendSms(from, to, text, function (error, result) {
  //   // If some error occured
  //   if (error) {
  //     console.log('ERROR', error);
  //   }

  //   // If message is sent successfully
  //   else {
  //     console.log('RESULT', result);
  //   }
  // });

  res.send('sms send');
});

router.get('/all/:id', verifAuth, async function (req, res, next) {
  const devv = await Delivery.find(
    { userId: req.params.id }
    // { _id: 1, username: 1, email: 1, adresse: 1, phone: 1 }
  );
  res.send({ data: devv });
});
router.get(
  '/listdeliverybycompany/:id',
  verifAuth,
  async function (req, res, next) {
    const devv = await Delivery.find(
      { companyId: req.params.id }
      // { _id: 1, username: 1, email: 1, adresse: 1, phone: 1 }
    );
    res.send({ data: devv });
  }
);

router.get('/passdelivery/:id', verifAuth, async (req, res, next) => {
  try {
    const devv = await Delivery.findById(req.params.id);
    res.send({ data: devv });
  } catch (error) {
    res.status(404).send({ error: 'delivery not found try again' });
  }
});

router.delete('/passdelivery/:id', verifAuth, async (req, res, next) => {
  try {
    const devv = await Delivery.findById(req.params.id);
    await devv.remove();
    res.send({ data: true });
  } catch (error) {
    res.status(404).send({ error: 'delivery not found try again' });
  }
});

router.patch('/passdelivery/:id', verifAuth, async (req, res, next) => {
  try {
    const devv = await Delivery.findById(req.params.id);
    Object.assign(devv, req.body);
    devv.save();
    res.send({ data: devv });
  } catch (error) {
    res.status(404).send({ error: 'delivery not found try again' });
  }
});

router.get('/admin/passdelivery/:id', verifAuth, async (req, res, next) => {
  try {
    const devv = await checkboxModel.findById(req.params.id);
    res.send({ data: devv });
    console.log(req.body);
  } catch (error) {
    res.status(404).send({ error: 'delivery not found try again' });
  }
});

router.get('/all/from', verifAuth, async (req, res, next) => {
  const devv = await Delivery.find({}, { _id: 0, from: 1 });
  res.send({ data: devv });
});
router.get('/all/to', verifAuth, async function (req, res, next) {
  const devv = await Delivery.find({}, { _id: 0, to: 1 });
  res.send({ data: devv });
});
router.get('/stat_all_deliverys', verifAuth, async (req, res) => {
  const deliverystat = await Delivery.aggregate([
    {
      $group: {
        _id: '$adresse',
        count: { $sum: 1 },
      },
    },
  ]);
  res.send({ data: deliverystat });
});
module.exports = router;
