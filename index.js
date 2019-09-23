const {exec} = require('child_process');

const bins_path = {
    darwin: {
        blur: `${__dirname}/bin/darwin/gaussian_blur/gaussian_blur`,
        oil: `${__dirname}/bin/darwin/oil_filter/oil_filter`
    }
};

class Logger {
    constructor() {
        //
    }

    static run(classInstance) {
        console.log(`Running ${classInstance.name} on ${classInstance.args.image.input}`);
    };

    static success(classInstance) {
        console.log(`Successfully finished running ${classInstance.name} on ${classInstance.args.image.input}`);
    };
};

class Filter {

    args = {
        image: {
            input: "",
            output: ""
        },
        options: {
            radius: 0,
            sigma: 0
        }
    };

    constructor(input_data, name = "", execPath = "") {
        this.args.image.input = input_data.image.input;
        this.args.image.output = input_data.image.output;
        this.args.options.radius = input_data.options.radius;
        this.args.options.sigma = input_data.options.sigma;

        const data = this.args;
        const args = [
            `-imgI ${data.image.input}`,
            `-imgO ${data.image.output}`,
            `-r ${data.options.radius}`,
            `-s ${data.options.sigma}`
        ];

        // Logger.run(this);

        return new Promise((resolve, reject) => {
            exec(execPath + ` ` + args.join(' '), {}, (error, stdout, stderr) => {
                if (error) {
                    reject();
                    throw error;
                }
                console.log(stdout);
                resolve();
            });
        });
    }
}


class GaussianBlur extends Filter {

    constructor(input_data) {

        const name = "GaussianBlur";
        const execPath = bins_path.darwin.blur;

        super(input_data, name, execPath)
    }
}

class OilFilter extends Filter {

    constructor(input_data) {

        const name = "OilFilter";
        const execPath = bins_path.darwin.oil;

        super(input_data, name, execPath)
    }

}


module.exports = {
    GaussianBlur,
    OilFilter
};

// Testing
// (new OilFilter({
//     image: {
//         input: "/Users/dragomirturcanu/Developer/meanfilter/meanfilter/c1.jpg",
//         output: "/Users/dragomirturcanu/Developer/meanfilter/meanfilter/meanc1.jpg"
//     },
//     options: {
//         radius: 20,
//         sigma: 40
//     }
// })).then(() => { console.log('Oil Filter Done!'); })