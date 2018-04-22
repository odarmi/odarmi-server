
import Router from "koa-router";

import { User } from "../../database/models/user";

let router = new Router();

// GET /users
router
    .get("/", async (ctx) => {
        let users = await User.query();
        ctx.body = users;
        ctx.status = 200;
    })
    
    .get("/:id", async (ctx) => {
        let users = await User.query()
            .where({ id: ctx.params.id });
        if (users.length == 0) {
            ctx.status = 404;
            return;
        }
        ctx.status = 200;
        ctx.body = users[0];
    })
;

export { router as usersRouter };
