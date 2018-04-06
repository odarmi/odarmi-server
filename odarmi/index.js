
const Koa = require("koa");
let pg = require("odarmi/database/db-client");

async function main() {
    let app = new Koa();
    
    let exists = await pg.schema.hasTable("users");
    console.log(exists);
    if (!exists) {
        let res = await pg.schema.createTable("users", (table) => {
            table.increments().primary();
            table.string("email").unique();
        });
    }
    
    res = await pg("users").insert({email: "aytung94@gmail.com"});
    console.log(res);

    app.listen(3000);
}

main()
