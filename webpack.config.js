const path = require("path");

module.exports = {
    name: 'webpack-setting',
    mode: "production",
    devtool: "eval",

    resolve: {
        alias: {
            assets: "./src/assets",
            components: "./src/components",
            common: "./src/common"
        },
        extensions: [".jsx", ".js"],
    },

    entry: {
        app: ["./index.jsx"],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
}