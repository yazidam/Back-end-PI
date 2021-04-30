var express = require('express');

const CheckboxModel = require('../../models/checkboxModel ');
var router = express.Router();
const verifAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/auth');
  }
};
router.post('/add', verifAuth, async function (req, res, next) {
  try {
    const admintab = new CheckboxModel(req.body);
    await admintab.save();
    console.log(req.body);
    res.send({ data: admintab });
  } catch (error) {
    res.status(404).send({ error: 'ghalta' });
  }
});
module.exports = router;
