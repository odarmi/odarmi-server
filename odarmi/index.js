
const Koa = require("koa");
const DbClient = require("odarmi/database/db-client")

let app = new Koa();
let dbClient = new DbClient();
console.log(dbClient.name);
