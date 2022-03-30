const path = require('path');

module.exports = {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
        },
    },
};
