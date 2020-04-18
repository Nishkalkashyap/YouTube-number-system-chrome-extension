const path = require('path');

module.exports = {
    entry: {
        main: './src/index.ts'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'production',
}