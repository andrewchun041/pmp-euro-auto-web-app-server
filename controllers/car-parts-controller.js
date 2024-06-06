const knex = require('knex')(require('../knexfile'));

// get all car parts
const index = async (_req, res) => {
    try {
        const data = await knex("car_parts").join("cars", "cars.id", "car_parts.car_id");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Car Parts data: ${err}`);
    }
}

// get a single car part
const findOne = async (req, res) => {
    try {
        const carPartFound = await knex("car_parts")
          .join("cars", "cars.id", "car_parts.car_id")
          .where("car_parts.id", req.params.id);

        if (carPartFound.length === 0) {
            return res.status(404).json({
                message: `Car Part with ID ${req.params.id} not found`,
            });
        }

        const carPartData = carPartFound[0];
        res.json(carPartData);
    } catch (err) {
        res.status(500).json({
            message: `Unable to retrieve car part data for car part with ID ${req.params.id}: ${err}`,
        });
    }
}

// create a new car part


// update car part


// delete car part


module.exports = {
    index,
    findOne,

};