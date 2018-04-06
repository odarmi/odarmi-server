
const Knex = require("knex")
pg = new Knex({
    client: "pg",
    version: "9.6",
    connection: {
        host: "ben-db.cpbikfhxnqpa.us-east-1.rds.amazonaws.com",
        user: "postgres",
        password: "postgres",
        database: "odarmi"
    }
})

module.exports = pg;
