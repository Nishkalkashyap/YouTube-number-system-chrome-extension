const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.ts'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'production',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/i,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {
                from: path.resolve('./manifest.json'),
                to: './'
            }
        ]),
    ]
}