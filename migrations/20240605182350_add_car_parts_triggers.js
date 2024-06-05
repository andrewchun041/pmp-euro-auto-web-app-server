/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.raw(`
        CREATE TRIGGER car_part_insert_trigger
        AFTER INSERT ON car_parts
        FOR EACH ROW
        BEGIN
            UPDATE cars
            SET number_of_parts = number_of_parts + 1
            WHERE id = NEW.car_id;
        END;
    `);

    await knex.schema.raw(`
        CREATE TRIGGER car_part_delete_trigger
        AFTER DELETE ON car_parts
        FOR EACH ROW
        BEGIN
            UPDATE cars
            SET number_of_parts = number_of_parts - 1
            WHERE id = OLD.car_id;
        END;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.raw(`DROP TRIGGER IF EXISTS car_part_insert_trigger;`);
    await knex.schema.raw(`DROP TRIGGER IF EXISTS car_part_delete_trigger;`);
};
