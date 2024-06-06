const router = require('express').Router();
const carPartsController = require('../controllers/car-parts-controller');

router.route("/").get(carPartsController.index);

module.exports = router;