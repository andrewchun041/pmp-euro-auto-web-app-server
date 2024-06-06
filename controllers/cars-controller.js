const knex = require('knex')(require('../knexfile'));

// get all cars
const index = async (_req, res) => {
    try {
        const data = await knex("cars");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Cars data: ${err}`);
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
          .select(
            "car_parts.id",
            "car_parts.part_stock",
            "car_parts.part_name",
            "car_parts.price",
            "car_parts.number_of_pieces",
            "car_parts.created_at",
            "car_parts.updated_at"
          )
          .where({ car_id: req.params.id });
        res.json(carParts);
    } catch (err) {
        res.status(500).json({
            message: `Unable to retrieve car parts for car with ID ${req.params.id}: ${err}`,
        });
    }
}

// create a new car
const add = async (req, res) => {
    const { car_stock, make, model, year, vin, mileage_kms, mileage_miles } = req.body;

    if (!car_stock || !vin || !make || !model || !year || !mileage_kms || !mileage_miles) {
        return res.status(400).json({
            message: "Please provide car_stock, make, model, year, vin, mileage_kms, and mileage_miles for the car in the request",
        });
    }

    try {
        const result = await knex("cars").insert(req.body);

        const newCarId = result[0];
        const createdCar = await knex("cars").where({ id: newCarId });

        res.status(201).json(createdCar);
    } catch (err) {
        res.status(500).json({
            message: `Unable to create a new car: ${err}`,
        });
    }
}

// update car
const update = async (req, res) => {
    try {
        const rowUpdated = await knex("cars")
            .where({ id: req.params.id })
            .update(req.body);
        
        if (rowUpdated === 0) {
            return res.status(404).json({
                message: `Car with ID ${req.params.id} not found`,
            });
        }

        const updatedCar = await knex("cars").where({ id: req.params.id, });

        res.json(updatedCar[0]);
    } catch (err) {
        res.status(500).json({
            message: `Unable to update car with ID ${req.params.id}: ${err}`,
        })
    }
}

// delete car
const remove = async (req, res) => {
    try {
        const rowDeleted = await knex("cars")
            .where({ id: req.params.id })
            .delete();
        
        if (rowDeleted === 0) {
            return res.status(404).json({
                message: `Car with ID ${req.params.id} not found`,
            });
        }

        res.sendStatus(204); // no content response
    } catch (err) {
        res.status(500).json({
            message: `Unable to delete car: ${err}`,
        });
    }
}

module.exports = {
    index,
    findOne,
    carParts,
    add,
    update,
    remove,
};