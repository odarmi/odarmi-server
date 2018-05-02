
import Router from "koa-router";
import { usersRouter } from "./users/routes";
import { moodsRouter } from "./moods/routes";
import { predictRouter } from "./predict/routes";

let router = new Router({
    prefix: "/api"
});

router.use("/users", usersRouter.routes());
router.use("/moods", moodsRouter.routes());
router.use("/predict", predictRouter.routes());

export { router };
