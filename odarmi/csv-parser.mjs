
import csv from "csv";
import fs from "fs";

const defaultSaveOptions = {
        
};

class CsvAdapter {

    

    static save(fname, data, options=defaultSaveOptions) {
        return new Promise((resolve, reject) => {
            csv.stringify(data, options, (err, output) => {
                if (err) {
                    reject(err);
                }
                fs.writeFileSync(fname, output);
                resolve(output);
            });
        })
    }

    static parse(fname) {
        return new Promise((resolve, reject) => {
            let csvData = fs.readFileSync(fname);
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

export { CsvAdapter };
