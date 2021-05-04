var express = require('express');
var router = express.Router();
const { getDistance } = require('geolib');
const my = { latitude: 13.6750876, longitude: 100.59918309999999 };
const my2 = { latitude: 48.8588376, longitude: 2.2768486 };
const { orderByDistance } = require('geolib');
router.post('/', (req, res, next) => {
  let order = orderByDistance(req.body.start, req.body.points);
  number = order.length;
  let points = {
    start: req.body.start,
    waypoints: order,
  };
  // dist = getDistance(req.body.start, req.body.points);

  //console.log('distance', dist, 'KM');
  res.send(points);
  // res.send(dist);
});
router.post('/dist', (req, res) => {
  //let order = orderByDistance(req.body.start, req.body.points);
  // number = order.length;
  // let points = {
  //   start: req.body.start,
  //   waypoints: order,
  // };
  dist = getDistance(my, my2, 1000);
  //console.log('rrr', points);

  console.log('distance', dist, 'KM');
  res.sendStatus(200, dist);
});
module.exports = router;
// res.send({ points, dataaa: dist });
