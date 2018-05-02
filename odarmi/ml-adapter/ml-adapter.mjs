
import ChildProcess from "child_process";
import Pino from "pino";
import moment from "moment";
// import csv from "csv";
import fs from "fs";

import { CsvAdapter } from "../csv-parser";

const scriptPath = "../odarmi-ML/model/predict_mood.py";

const pino = new Pino();

const momentDateFormat = "M/D/YYYY";
const momentTimeFormat = "H:mm:ss";

const defaultCsvData = {
    id: 0,
    Address: "7849 Shoal Creek Blvd, Austin, TX 78757",
    BeginDate: moment().subtract(1, "hour").format(momentDateFormat),
    BeginTime: moment().subtract(1, "hour").format(momentTimeFormat),
    Category: "Restaurant",
    Distance: 0,
    Duration: "1h 0min 0sec",
    EndDate: moment().format(momentDateFormat),
    EndTime: moment().format(momentTimeFormat),
    IndexTime: "",
    Name: "Cabo Bob's",
    WeekDay: moment().day() - 1,
    Weather: " clear-day",
    "People-Allen Wang": 0,
    "People-Allen Yu": 0,
    "People-Ben Fu": 0,
    "People-Dad": 0,
    "People-Daniel Li": 0,
    "People-Daniel Jee": 0,
    "People-Danny Vo": 0,
    "People-Drew Vogelsang": 0,
    "People-Ethan Ho": 0,
    "People-Haisun Banh": 0,
    "People-Isabel Chang": 0,
    "People-Jason Cheung": 0,
    "People-Josh Nam": 0,
    "People-Keith Wong": 0,
    "People-Kenneth Chow": 0,
    "People-Kevin Zeng": 0,
    "People-Melissa Tung": 0,
    "People-Mom": 0,
    "People-Penny Lan": 0,
    "People-Sharon Yu": 0,
    "People-Spencer Lan": 0,
    "People-Stacy Lan": 0
}

const MLCsvLabels = [
    "id",
    "Address",
    "BeginDate",
    "BeginTime",
    "Category",
    "Distance",
    "Duration",
    "EndDate",
    "EndTime",
    "IndexTime",
    "Name",
    "WeekDay",
    "Weather",
    "People-Allen Wang",
    "People-Allen Yu",
    "People-Ben Fu",
    "People-Dad",
    "People-Daniel Li",
    "People-Daniel Jee",
    "People-Danny Vo",
    "People-Drew Vogelsang",
    "People-Ethan Ho",
    "People-Haisun Banh",
    "People-Isabel Chang",
    "People-Jason Cheung",
    "People-Josh Nam",
    "People-Keith Wong",
    "People-Kenneth Chow",
    "People-Kevin Zeng",
    "People-Melissa Tung",
    "People-Mom",
    "People-Penny Lan",
    "People-Sharon Yu",
    "People-Spencer Lan",
    "People-Stacy Lan"
];

class MLAdapter {

    // static loadPredictionFromCsv(fname) {
    //     let csvData = fs.readFileSync(fname).toString();
    //     return new Promise((resolve, reject) => {
    //         csv.parse(csvData, {
    //             columns: moodPredictionCsvLabels
    //         }, (err, output) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             // Remove the header row from the list of results
    //             resolve(output.slice(1));
    //         });
    //     })
        
    // }
    /**
     * Converts a mood entry to the csv entry that the ML model expects
     * @param mood the mood as specified in the Mood class
     */
    static convertMoodToCsvData(mood) {
        let moodCsv = {
            Address: mood.address,
            BeginDate: moment(mood.beginTime).format(momentDateFormat),
            BeginTime: moment(mood.beginTime).format(momentTimeFormat),
            // Category: "other",
            Category: mood.category,
            EndDate: moment(mood.endTime).format(momentDateFormat),
            EndTime: moment(mood.endTime).format(momentTimeFormat),
            Name: mood.locationName,
            Weather: " " + mood.weather,
            WeekDay: moment(mood.beginTime).days() - 1
        }

        // Now convert the people array to the one-hot encoded array
        mood.people.forEach((person) => {
            moodCsv["People-" + person] = 1
        });

        let csvData = Object.assign(defaultCsvData, moodCsv);
        return csvData;
    }

    static async runPrediction(input) {
        pino.info(input);
        let csvData = MLAdapter.convertMoodToCsvData(input);
        pino.info(csvData);
        await CsvAdapter.save("sample_input.csv", [csvData], {
            columns: MLCsvLabels,
            header: true
        });
        let proc = ChildProcess.spawnSync("python2", [scriptPath, "sample_input.csv"]);
        // pino.info(proc);
        pino.info(proc.stdout.toString());
        pino.info(proc.stderr.toString());
        let predictionResults = await CsvAdapter.parse("predicted_mood.csv");
        pino.info(predictionResults);
        predictionResults = predictionResults.map((moodCsv) => {
            return moodCsv.Mood;
        });
        return predictionResults;        
    }
}

export { MLAdapter };
