const router = require('express').Router();
const carsController = require('../controllers/cars-controller');

router.route("/").get(carsController.index);

router.route("/:id").get(carsController.findOne);

router.route("/:id/parts").get(carsController.carParts);

module.exports = router;