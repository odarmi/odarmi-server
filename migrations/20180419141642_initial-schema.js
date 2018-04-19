
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
            table.integer("userId").references("id").inTable("users");
            table.string("name");
            table.string("address");
            table.string("category");
            table.integer("distance");
            table.timestamp("beginTime");
            table.timestamp("endTime");
            table.timestamps(true, true);
        })
    ]);

};

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTableIfExists("users"),
        knex.schema.dropTableIfExists("moods")
    ]);
};
