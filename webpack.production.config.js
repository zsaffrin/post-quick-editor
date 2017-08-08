const Webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'index.js');
const distPath = path.join(__dirname, 'dist');

const config = {
	entry: {
		app: [sourcePath],
	},
	devtool: 'source-map',
	output: {
		path: distPath,
		filename: 'post-quick-editor-bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg)$/,
				use: 'file-loader?name=fonts/[name].[ext]',
			},
		],
	},
	plugins: [
		new Webpack.optimize.OccurrenceOrderPlugin(),
	],
};

module.exports = config;
