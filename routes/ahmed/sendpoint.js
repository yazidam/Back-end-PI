var express = require('express');
var router = express.Router();

const { orderByDistance } = require('geolib');
router.post('/', (req, res) => {
  let order = orderByDistance(req.body.start, req.body.points);
  number = order.length;
  let points = {
    start: req.body.start,
    waypoints: order,
  };
  res.send(points);
});
module.exports = router;
