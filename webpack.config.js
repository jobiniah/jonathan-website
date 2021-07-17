const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
    entry: {
        "js/index": './src/js/index.js',
        "js/resume": './src/js/resume.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "[name].js",
    },
    devServer: {
      port: 8080,
    },
    plugins: [
            new HtmlWebpackPlugin({
                template: "./src/pug/index.pug",
                filename: "index.html"
                
            }),
            new HtmlWebpackPlugin({
                template: "./src/pug/resume.pug",
                filename: "resume.html"
            }),
        ],
        module: {
            rules: [          
                { 
                test: /\.pug$/,
                use: ["pug-loader"]
                },
            ]
        },
};
  
module.exports = (env, argv) => {if (argv.mode === 'development') {}
   if (argv.mode === 'production') {}return config;
}

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: {
        main: './src/scss/main.scss'
    },
	output: {
		path: path.resolve(__dirname, 'dist/css'),
        filename: "[name].[id].css",
	},
    plugins: [
        new MiniCssExtractPlugin(),
    ],    
    module: {
		rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },  
		]
    },
};