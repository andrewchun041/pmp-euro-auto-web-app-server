const knex = require('knex')(require('../knexfile'));

// get all car parts
const index = async (_req, res) => {
    try {
        const data = await knex("car_parts");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Car Parts data: ${err}`);
    }
}

module.exports = { index };