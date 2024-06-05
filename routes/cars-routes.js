const router = require('express').Router();
const carsController = require('../controllers/cars-controller');

router.route("/").get(carsController.index);


module.exports = router;