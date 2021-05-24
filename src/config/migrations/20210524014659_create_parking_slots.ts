import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('parking_slots', (table: Knex.TableBuilder) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique();
    table.string('name').notNullable();
    table.uuid('parking_lot_id').notNullable();
    table.foreign('parking_lot_id').references('parking_lots.id');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('parking_slots');
}
