/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const markov = require("./markov");
const process = require("process");

/** Make Markov machine from text and generate text from it. */
function generateText(text) {
    let mm = new markov(text);
    console.log(mm.makeText());
}

// process.argv[0] is node, [1] is script path, so [2] is the first actual argument
let [method, path] = process.argv.slice(2);

if (method === 'file') {
    // Read from file
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        }
        generateText(data);
    });
} else if (method === 'url') {
    // Read from URL
    axios.get(path)
        .then(res => {
            generateText(res.data);
        })
        .catch(err => {
            console.error(`Cannot read URL: ${path}: ${err}`);
            process.exit(1);
        });
} else {
    console.error('Invalid method: use "file" or "url"');
    process.exit(1);
}
