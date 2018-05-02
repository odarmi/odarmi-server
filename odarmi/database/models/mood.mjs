
import { User } from "./user";
import { TableCreator } from "./table-creator";
import objection from "objection";

function createMoodsTable(table) {
    table.increments().primary();
    table.string("email").unique();
}

class Mood extends objection.Model {
    static get tableName() {
        return "moods";
    }

    static get idColumn() {
        return "id";
    }

    static get relationMappings() {
        return {
            user: {
                relation: objection.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "moods.userId",
                    to: "users.id"
                }
            }
        }
        
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [],
            properties: {
                id: { type: "integer" },
                userId: { type: "integer" },
                name: { type: "string" },
                address: { type: "string" },
                category: { type: "string" },
                distance: { type: "integer" },
                beginTime: { type: "date-time" },
                endTime: { type: "date-time" },
                createdAt: { type: "date-time" },
                updatedAt: { type: "date-time" },
                weekDay: { type: "integer" },
                weather: { type: "string" },
                mood: { type: "integer" },
                activity: { type: "string" },
                placeId: { type: "string" },
                locationName: { type: "string" },
                people: { type: "string" }
            }
        };
    }

    $beforeValidate(jsonSchema, obj, opt) {
        console.log(obj);
        obj.people = obj.people.join();
    }

    $afterGet(queryContext) {
        console.log(this.people);
        this.people = this.people.split(',');
    }
}

const mood = new TableCreator("moods", createMoodsTable);

export { Mood };
