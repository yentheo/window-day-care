const { ProvidePlugin } = require('webpack')

module.exports = {
    entry: "./test/index.ts",
    devtool: 'inline-source-map',
    resolve:  {
        extensions:  ['.webpack.js',  '.web.js', '.json',  '.ts',  '.tsx',  '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    plugins: [
        new ProvidePlugin({ Reflect: 'core-js/es7/reflect' })
    ],
    output: {
        path: __dirname + '/test',
        filename: "index.js",
        libraryTarget: "umd"
    }
};