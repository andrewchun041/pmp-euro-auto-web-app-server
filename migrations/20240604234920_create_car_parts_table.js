/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('car_parts', function(table) {
        table.increments('id').primary(); // Primary key that auto increments
        table.integer('part_stock').notNullable().unique(); // Stock number, starting at 100001
        table.string('part_name').notNullable(); // Part name
        table.integer('number_of_pieces').notNullable(); // Number of pieces, int
        table.integer('car_id').unsigned().notNullable(); // Foreign key referencing 'cars' table
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
        // Define foreign key constraint
        table.foreign('car_id').references('id').inTable('cars');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('car_parts');
};
