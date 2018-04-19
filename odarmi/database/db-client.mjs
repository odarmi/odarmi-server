
import Knex from "knex";
import objection from "objection";
import config from "config";

let pg = new Knex({
    client: config.get("db.client"),
    version: config.get("db.version"),
    connection: {
        host: config.get("db.host"),
        user: config.get("db.user"),
        password: config.get("db.password"),
        database: config.get("db.name")
    },
    ...objection.knexSnakeCaseMappers()
});

// Initialize knex with objection
objection.Model.knex(pg);

export { pg };
