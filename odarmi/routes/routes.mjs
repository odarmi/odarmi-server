
import Router from "koa-router";
import { usersRouter } from "./users/routes";
import { moodsRouter } from "./moods/routes";
import { weatherRouter } from "./weather/routes";

let router = new Router({
    prefix: "/api"
});

router.use("/users", usersRouter.routes());
router.use("/moods", moodsRouter.routes());
router.use("/weather", weatherRouter.routes());

export { router };
