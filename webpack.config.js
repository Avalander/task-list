const path = require('path')

module.exports = env => require(`./webpack/${env}`)({
	base_dir: path.resolve(__dirname),
	folders: {
		src: path.resolve(__dirname, 'src'),
		dist: path.resolve(__dirname, 'dist'),
	},
})