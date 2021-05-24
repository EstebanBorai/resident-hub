import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('parking_lots', (table: Knex.TableBuilder) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('parking_lots');
}
