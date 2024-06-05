/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cars', function(table) {
        table.increments('id').primary(); // Primary key that auto increments
        table.string('car_stock').notNullable(); // Example stock: C0147
        table.string('vin').notNullable().unique(); // Vehicle Identification Number, unique
        table.string('make').notNullable(); // Car make
        table.string('model').notNullable(); // Car model
        table.integer('year').notNullable(); // Car year
        table.integer('milage_kms').notNullable(); // Mileage in kilometers
        table.integer('milage_miles').notNullable(); // Mileage in miles
        table.integer('number_of_parts').notNullable(); // Number of parts, int
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('cars');
};
