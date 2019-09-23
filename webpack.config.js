// use node path library
const path = require("path");

// module.exports exposes something from a file - node feature
module.exports = {
    // entry now runs babel polyfill just before the index.js. polyfill supports includes func in older browsers
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        // path is absolute path - node provides __dirname (project directory absolute path)
        path: path.resolve(__dirname, "public/scripts"),
        filename: "bundle.js"
    },
    // config to use babel with webpack (first npm install babel-loader)
    module: {
        rules: [{
            // /regularexpression/, \ = escape character, $ at end = last part of file name
            test: /\.js$/,
            // excludes all third part modules from being 'babeld'
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    "presets": ["@babel/preset-env"]
                }
            }
        }]
    },
    // webpack dev-server config
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        publicPath: "/scripts/"
    },
    // means that log lines in console match actual lines in source js files
    devtool: "source-map"
}