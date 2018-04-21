
import csv from "csv";
import fs from "fs";

class CsvParser {

    constructor(fname, ...args) {
        this._fname = fname;
        this.parser = csv.parse(...args);
    }

    get fname() {
        return this._fname;
    }

    parse() {
        return new Promise((resolve, reject) => {
            let csvData = fs.readFileSync(this._fname);
            csv.parse(csvData,
                {
                    columns: true,
                    auto_parse: true
                },
                (err, output) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(output);
                });
        });
        
    }

}

export { CsvParser };
