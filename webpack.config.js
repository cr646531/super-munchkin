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
            {
                test: /\.(png|jpg|gif)$/,
                use: [{ loader: 'file-loader', options: {} }],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@public': path.resolve(__dirname, 'public'),
            '@db': path.resolve(__dirname, 'server/db'),
            '@src': path.resolve(__dirname, 'src'),
        },
    },
};
