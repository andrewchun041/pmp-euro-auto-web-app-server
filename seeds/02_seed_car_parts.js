/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
*/

let carPartsData = require('../data/car_parts_data.json')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('car_parts').del()
  // Insert seed entries
  await knex('car_parts').insert(carPartsData);
};
