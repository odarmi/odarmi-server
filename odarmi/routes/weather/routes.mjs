
import Router from "koa-router";
import proxy from "koa-proxies";

let router = new Router();

// Dark-Sky weather API
const baseUrl = "https://api.darksky.net";
const apiKey = "0123456789abcdef9876543210fedcba";

// GET /weather
router
    .use("/", async (ctx) => {
        ctx.log.info(ctx.path);
        ctx.log.info("HERESFYSDGFSD");
    })
    // .use("/", proxy("/weather", {
    //     target: baseUrl,
    //     changeOrigin: true,
    //     logs: true
    // }));

export { router as weatherRouter };
