
const TableCreator = require("./table-creator");

function createMoodsTable(table) {
    table.increments().primary();
    table.string("email").unique();
}

module.exports = new TableCreator("moods", createMoodsTable);