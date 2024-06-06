const router = require('express').Router();
const carPartsController = require('../controllers/car-parts-controller');

router.route("/").get(carPartsController.index);

router.route("/:id").get(carPartsController.findOne);

module.exports = router;