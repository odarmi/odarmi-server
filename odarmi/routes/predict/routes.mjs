import Router from "koa-router";

import { MLAdapter } from "../../ml-adapter/ml-adapter";

let router = new Router();

// GET /users
router
    .post("/", async (ctx) => {
        let body = ctx.request.body;
        ctx.log.info(body);
        let res = await MLAdapter.runPrediction(body);
        ctx.body = res;
        ctx.status = 200;
    });

export { router as predictRouter };
