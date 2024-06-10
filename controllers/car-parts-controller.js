const knex = require('knex')(require('../knexfile'));

const selectArray = [
    // car parts data
    "car_parts.id",
    "car_parts.car_id",
    "car_parts.part_stock",
    "car_parts.part_name",
    "car_parts.price",
    "car_parts.number_of_pieces",
    "car_parts.created_at",
    "car_parts.updated_at",
    // car data
    "cars.car_stock",
    "cars.make",
    "cars.model",
    "cars.year",
    "cars.vin",
    "cars.mileage_kms",
    "cars.mileage_miles",
    "cars.number_of_parts"
];

// get all car parts
const index = async (_req, res) => {
    try {
        const data = await knex("car_parts")
            .join("cars", "cars.id", "car_parts.car_id")
            .select(selectArray)
            .orderBy("car_parts.id"); // fixes order being based off of cars id instead of car parts id
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
          .where("car_parts.id", req.params.id)
          .select(selectArray);

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
const add = async (req, res) => {
    const { part_stock, car_id, part_name, number_of_pieces, price } = req.body;

    if (!part_stock || !car_id || !part_name || !number_of_pieces || !price) {
        return res.status(400).json({
            message: "Please provide part_stock, car_id, part_name, number_of_pieces, and price for the car part in the request",
        });
    }

    try {
        const result = await knex("car_parts").insert(req.body);

        const newCarPartId = result[0];
        const createdCarPart = await knex("car_parts").where({ id: newCarPartId });

        res.status(201).json(createdCarPart);
    } catch (err) {
        res.status(500).json({
            message: `Unable to create a new car part: ${err}`,
        });
    }
}

// update car part
const update = async (req, res) => {
    try {
        const rowUpdated = await knex("car_parts")
            .where({ id: req.params.id })
            .update(req.body);
        
        if (rowUpdated === 0) {
            return res.status(404).json({
                message: `Car Part with ID ${req.params.id} not found`,
            });
        }

        const updatedCarPart = await knex("car_parts").where({ id: req.params.id, });

        res.json(updatedCarPart[0]);
    } catch (err) {
        res.status(500).json({
            message: `Unable to update car part with ID ${req.params.id}: ${err}`,
        })
    }
}

// delete car part
const remove = async (req, res) => {
    try {
        const rowDeleted = await knex("car_parts")
            .where({ id: req.params.id })
            .delete();
        
        if (rowDeleted === 0) {
            return res.status(404).json({
                message: `Car Part with ID ${req.params.id} not found`,
            });
        }

        res.sendStatus(204); // no content response
    } catch (err) {
        res.status(500).json({
            message: `Unable to delete car part: ${err}`,
        });
    }
}

module.exports = {
    index,
    findOne,
    add,
    update,
    remove,
};