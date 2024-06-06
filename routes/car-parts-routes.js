const router = require('express').Router();
const carPartsController = require('../controllers/car-parts-controller');

router.route("/")
    .get(carPartsController.index)
    .post(carPartsController.add);

router.route("/:id")
    .get(carPartsController.findOne)
    .patch(carPartsController.update)
    .delete(carPartsController.remove);

module.exports = router;