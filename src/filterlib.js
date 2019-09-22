const {exec} = require('child_process');

const bins_path = {
    darwin: {
        blur: `${__dirname}/bin/darwin/gaussian_blur`
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


class GaussianBlur {

    name = "GaussianBlur";

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

    constructor(input_data) {
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
            exec(bins_path.darwin.blur + ` ` + args.join(' '), {}, (error, stdout, stderr) => {
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

module.exports = {
    GaussianBlur
};
