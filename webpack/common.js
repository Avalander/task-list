const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ base_dir, folders }) => ({
	entry: {
		main: path.resolve(folders.src, 'index.js'),
	},
	output: {
		path: folders.dist,
		filename: '[name].bundle.js',
	},
	module: {
		rules: [{
			test: /\.js/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [[ 'env', {
						targets: {
							browsers: [ 'last 2 versions' ],
						}
					}]]
				},
			}
		}, {
			test: /\.png/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/',
				}
			}
		}, {
			test: /\.woff(2?)/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'application/font-woff'
				}
			}
		}, {
			test: /\.ttf/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'application/octet-stream'
				}
			}
		}, {
			test: /\.eot/,
			use: {
				loader: 'file-loader',
			}
		}, {
			test: /\.svg/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'image/svg+xml'
				}
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(folders.src, 'index.html'),
			filename: 'index.html',
		}),
	],
	resolve: {
		modules: [
			folders.src,
			'node_modules',
		]
	},
})