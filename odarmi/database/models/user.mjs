
import { TableCreator } from "./table-creator";
import objection from "objection";

function createUsersTable(table) {
    table.increments().primary();
    table.string("email").unique();
}

class User extends objection.Model {
    static get tableName() {
        return "users";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["id"],
            properties: {
                id: { type: "integer" },
                email: { type: "string" }
            }
        };
    }
}

let user = new TableCreator("users", createUsersTable);

export { User };
