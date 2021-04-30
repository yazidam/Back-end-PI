const Vehicule = require('../../models/Vehicule');
const Archive = require('../../models/Archive');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const cors = require('cors');
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'routes/images/');
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const app = express();
app.use(express.json());
app.use(cors());
router.use(express.static('routes/images/'));

const verifAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/auth');
  }
};

router.get('/getvehicules/:id', verifAuth, async (req, res) => {
  const vehicules = await Vehicule.find({ userId: req.params.id });
  res.send({ data: vehicules });
});
router.get('/statsvehicules', verifAuth, async (req, res) => {
  const vehicules = await Vehicule.aggregate([
    {
      $group: {
        _id: '$modele',
        count: { $sum: 1 },
      },
    },
  ]);
  res.send({ data: vehicules });
});
router.post(
  '/vehicules',
  upload.single('image'),
  verifAuth,
  async (req, res) => {
    const { modele, marque, userId } = req.body;
    const { file } = req;
    const vehicule = new Vehicule({
      modele,
      marque,
      userId,
      image: (file && file.filename) || null,
    });
    await vehicule.save();
    console.log('val de user id');
    res.send({ data: vehicule });
  }
);
//{_id: "607f65ff29fd3035b818801f", username: "aymen", email: "aymen@gmail.com", adresse: "paris", phone: "70604051", …}
router.get('/vehicules/:id', verifAuth, async (req, res) => {
  const vehicules = await Vehicule.findById(req.params.id);
  res.send({ data: vehicules });
});

router.get('/archives/:id', verifAuth, async (req, res) => {
  try {
    const archive = await Archive.findById(req.params.id);
    await archive.remove();
    res.send({ data: true });
  } catch {
    res.status(404).send({ error: 'Vehicule is not found' });
  }
});

router.delete('/vehicules/:id', verifAuth, async (req, res) => {
  try {
    const vehicule = await Vehicule.findById(req.params.id);
    modele = vehicule.modele;
    marque = vehicule.marque;
    image = vehicule.image;
    const archive = new Archive({
      modele,
      marque,
      image,
    });
    await archive.save();
    await vehicule.remove();
    console.log('deleted vehicule', vehicule);
    console.log('deleted items', archive);

    res.send({ data: true, dataa: archive });
  } catch {
    res.status(404).send({ error: 'Vehicule is not found' });
  }
});
router.get('/getarchives', verifAuth, async (req, res) => {
  const archives = await Archive.find();
  console.log('archives', archives);
  res.send({ data: archives });
});
router.patch(
  '/vehicules/:id',
  upload.single('image'),
  verifAuth,
  async (req, res) => {
    const id = req.params.id;

    const body = req.body;

    console.log('body:', body);
    console.log('req:', req);

    const modele = body.modele;
    const marque = body.marque;
    const image = req.file.filename;

    Vehicule.findOneAndUpdate(
      id,
      {
        $set: {
          modele,
          marque,
          image,
        },
      },
      { new: true }
    )
      .then((data) => {
        req.flash('success', 'Edits submitted successfully');
      })
      .catch((err) => {
        return req.flash('error', 'Unable to edit vehicule');
      });
  }
);
module.exports = router;
