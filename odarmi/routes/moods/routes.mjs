
import Router from "koa-router";

import { Mood } from "../../database/models/mood";

let router = new Router();

// GET /users
router
    .get("/", async (ctx) => {
        let query = ctx.query;
        
        // No query, so return all users.
        if (!query) {
            let users = await Mood.query();
            ctx.body = users;
            ctx.status = 200;
            return;
        }

        // Pass the query to the database
        let users = await Mood.query()
            .where(query);
        
        ctx.body = users;
        ctx.status = 200;
    })

    .post("/", async (ctx) => {
        let body = ctx.request.body;
        let res = await Mood.query()
            .insert(body);
        ctx.body = res;
        ctx.status = 201;
    })

    .get("/:id", async (ctx) => {
        let users = await Mood.query()
            .where({ id: ctx.params.id });
        if (users.length == 0) {
            ctx.status = 404;
            return;
        }
        ctx.status = 200;
        ctx.body = users[0];
    })

    .put("/:id", async (ctx) => {
        let body = ctx.request.body;
        let res = await Mood.query()
            .patch(body)
            .where({ id: ctx.params.id });
        
        ctx.status = 200;
        ctx.body = res;
    })

    .patch("/:id", async (ctx) => {
        let body = ctx.request.body;
        let res = await Mood.query()
            .patch(body)
            .where({ id: ctx.params.id });
        
        ctx.status = 200;
        ctx.body = res;
    })

    .delete("/:id", async (ctx) => {
        let res = await Mood.query()
            .delete()
            .where({ id: ctx.params.id });
        ctx.status = 202;
        ctx.body = res;
    });
;

export { router as moodsRouter };
