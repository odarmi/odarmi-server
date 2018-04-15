
const user = require("./models/user");
const mood = require("./models/mood");

const TABLES = [
    user,
    mood
]

async function createTables(tables = TABLES) {
    for (table of tables) {
        let exists = await pg.schema.hasTable(table.name);
        if (!exists) {
            let res = await pg.schema.createTable(table.name, table.create);
        }
    }
}

module.exports = createTables;
