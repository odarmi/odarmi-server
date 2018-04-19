
import Koa from "koa";
import Pino from "pino";
import { createTables } from "./database/create-tables";

async function main() {
    let app = new Koa();
    let pino = new Pino();
    try {
        let res = await createTables();
        pino.info(res);
    }
    catch(err) {
        pino.error(err);
    }

    app.listen(3000);
}

main()
