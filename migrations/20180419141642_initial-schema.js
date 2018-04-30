
exports.up = async (knex, Promise) => {
    await Promise.all([
        knex.schema.dropTableIfExists("users"),
        knex.schema.dropTableIfExists("moods")
    ]);
    return Promise.all([
        knex.schema.createTable("users", (table) => {
            table.increments("id").primary();
            table.string("email").unique();
        }),
        knex.schema.createTable("moods", (table) => {
            table.increments("id").primary();
            table.integer("user_id").references("id").inTable("users");
            table.string("name");
            table.string("address");
            table.string("category");
            table.integer("distance");
            table.timestamp("begin_time");
            table.timestamp("end_time");
            table.integer("week_day");
            table.string("weather");
            table.integer("mood");
            table.string("activity");
            table.string("place_id");
            table.string("location_name");
            table.timestamps(true, true);
        })
    ]);

};

exports.down = (knex, Promise) => {
    return Promise.all([
        knex("moods").truncate(),
        knex.schema.dropTableIfExists("moods"),
        knex("users").truncate(),
        knex.schema.dropTableIfExists("users")
    ]);
};
