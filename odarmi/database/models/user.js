
const TableCreator = require("./table-creator");

function createUsersTable(table) {
    table.increments().primary();
    table.string("email").unique();
}

module.exports = new TableCreator("users", createUsersTable);
