const knex = require('knex')(require('../knexfile'));

// get all cars
const index = async (_req, res) => {
    try {
        const data = await knex("cars");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Cars: ${err}`);
    }
}

// get a single car
const findOne = async (req, res) => {
    try {
        const carFound = await knex("cars").where({ id: req.params.id });

        if (carFound.length === 0) {
            return res.status(404).json({
                message: `Car with ID ${req.params.id} not found`,
            });
        }

        const carData = carFound[0];
        res.json(carData);
    } catch (err) {
        res.status(500).json({
            message: `Unable to retrieve car data for car with ID ${req.params.id}: ${err}`,
        });
    }
}

// return car_parts related to car
const carParts = async (req, res) => {
    try {
        const carParts = await knex("cars")
            .join("car_parts", "car_parts.car_id", "cars.id")
            .where({ car_id: req.params.id });
            // space for knex code for selective data return (delete if not needed)
        res.json(carParts);
    } catch (err) {
        res.status(500).json({
            message: `Unable to retrieve car parts for car with ID ${req.params.id}: ${err}`,
        });
    }
}


module.exports = {
    index,
    findOne,
    carParts,

};