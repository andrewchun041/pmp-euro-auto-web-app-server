const router = require('express').Router();
const carsController = require('../controllers/cars-controller');

router.route("/")
    .get(carsController.index)
    .post(carsController.add);

router.route("/:id")
    .get(carsController.findOne)
    .patch(carsController.update)
    .delete(carsController.remove);

router.route("/:id/parts")
    .get(carsController.carParts);

module.exports = router;