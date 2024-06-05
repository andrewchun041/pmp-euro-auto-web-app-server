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
// const findOne = async (req, res) => {
//     try {
//         const carsFound = await knex("cars").where({ id: req.params.id });

//     }
// }


module.exports = {
    index,
};