const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const PwaManifestPlugin = require('webpack-pwa-manifest')

const merge = require('webpack-merge')
const common_config = require('./common')


module.exports = ({ base_dir, folders }) => merge(common_config({ base_dir, folders }), {
	entry: {
		sw: path.resolve(base_dir, folders.src, 'init-sw.js'),
	},
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
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true,
		}),
		new ServiceWorkerPlugin({
			entry: path.resolve(base_dir, folders.src, 'sw', 'index.js')
		}),
		new PwaManifestPlugin({
			name: 'Task List',
			short_name: 'Task List',
			description: 'Simple tast list by Avalander',
			background_color: '#2db92d',
			theme_color: '#2db92d',
			display: 'standalone',
			orientation: 'portrait',
			start_url: '/',
			icons: [{
				src: path.resolve(base_dir, folders.src, 'icon.png'),
				sizes: [48, 72, 96, 128, 192, 256],
			}],
		}),
	]
})
