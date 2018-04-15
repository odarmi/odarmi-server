
const Koa = require("koa");
let pg = require("odarmi/database/db-client");
const createTables = require("./database/create-tables")

async function main() {
    let app = new Koa();

    createTables();
    

    app.listen(3000);
}

main()
