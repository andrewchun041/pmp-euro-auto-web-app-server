/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

let carsData = require('../data/cars_data.json')

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").del();
  // Insert seed entries
  await knex("cars").insert(carsData);
};
