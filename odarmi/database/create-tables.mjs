
import { pg } from "./db-client";
import { User } from "./models/user";
import { Mood } from "./models/mood";

import objection from "objection";

const TABLES = [
    // user,
    // mood
]

async function createTables(tables = TABLES) {
    console.log("Creating tables...");
    return User.query();
    // let promises = tables.map(async (table) => {
    //     let exists = await pg.schema.hasTable(table.name);
    //     if (!exists) {
    //         return pg.schema.createTable(table.name, table.create);
    //     }
    //     return Promise.resolve("table exists.");
    // });
    // for (table of tables) {
    //     let exists = await pg.schema.hasTable(table.name);
    //     if (!exists) {
    //         let res = await pg.schema.createTable(table.name, table.create);
    //     }
    // }
    return Promise.all(promises);
}

export { createTables };
