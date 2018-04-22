
import Router from "koa-router";
import { usersRouter } from "./users/routes";
import { moodsRouter } from "./moods/routes";

let router = new Router({
    prefix: "/api"
});

router.use("/users", usersRouter.routes());
router.use("/moods", moodsRouter.routes());

export { router };
