

import path from "path";
import Koa from "koa";
import Pino from "pino";
import csv from "csv";
import logger from "koa-pino-logger";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import proxy from "koa-proxies";
import { router } from "./routes/routes";
import { createTables } from "./database/create-tables";
import { CsvAdapter } from "./csv-parser";
import { Mood } from "./database/models/mood";
import { User } from "./database/models/user";

const CSV_DATA_FNAME = path.resolve("/home/bennycooly/Projects/odarmi/odarmi-ML/data/tung_hist_jan_mar_weather_nolocomotion_mood.csv");

const WEATHER_API_KEY = "a6aa5ae738fb6240520f5186c2696b02";

async function insertCsvEntries() {
    let pino = new Pino();
    try {
        let user = await User.query()
            .where({email: "aytung94@gmail.com"});
        
        if (user.length == 0) {
            pino.info("Creating user...");
            await User.query()
                .insert({email: "aytung94@gmail.com"});
        }
        
        // Parse the csv file
        let csvData = await CsvAdapter.parse(CSV_DATA_FNAME);
        
        csvData.forEach(async (entry) => {
            await Mood
                .query()
                .insert({
                    userId: 1,
                    locationName: entry.Name,
                    address: entry.Address,
                    category: entry.Category,
                    distance: entry.Distance,
                    beginTime: new Date(`${entry.BeginDate} ${entry.BeginTime}`),
                    endTime: new Date(`${entry.EndDate} ${entry.EndTime}`),
                    weekDay: entry.WeekDay,
                    weather: entry.Weather.trim(),
                    mood: entry.Mood | 0
                    // startDate: 
                });
         
     });
    }
    
    catch(err) {
        pino.error(err);
    }
     
}

async function main() {
    let app = new Koa();
    let pino = new Pino();

    // await insertCsvEntries();
    app.use(logger());

    app.use(cors());
    app.use(bodyParser());

    app
        .use(router.routes())
        .use(router.allowedMethods());
    
    app.use(proxy("/api/weather", {
        target: "https://api.darksky.net",
        changeOrigin: true,
        rewrite: (path) => {
            return path
                .replace("/api/weather", "")
                .replace("API_KEY", WEATHER_API_KEY);
        },
        logs: true
    }));

    pino.info("Odarmi listening on port :3000");
   
    // pino.info(csvData);

    app.listen(3000);
}

main()
