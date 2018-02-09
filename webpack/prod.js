const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const merge = require('webpack-merge')
const common_config = require('./webpack.common')


module.exports = ({ base_dir, folders }) => merge(common_config({ base_dir, folders }), {
	module: {
		rules: [{
			test: /\.scss/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [ 'css-loader', {
					loader: 'sass-loader',
					options: {
						includePaths: [ path.resolve(base_dir, folders.src) ],
					},
				}],
				publicPath: 'dist',
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true,
		})
	]
})
