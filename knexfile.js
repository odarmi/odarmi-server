
let config = require("config");
let objection = require("objection");
// Update with your config settings.

dbConfig = {
    client: config.get("db.client"),
    version: config.get("db.version"),
    connection: {
        host: config.get("db.host"),
        user: config.get("db.user"),
        password: config.get("db.password"),
        database: config.get("db.name")
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
}

module.exports = {
    development: dbConfig,
    staging: dbConfig,
    production: dbConfig
};
