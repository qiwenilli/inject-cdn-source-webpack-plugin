# inject-cdn-source-webpack-plugin

webpack.config.js

	const InjectCdnSourceWebpackPlugin = require('inject-cdn-source-webpack-plugin');
    
#### example:

	module.exports = {
	plugins: [
			new InjectCdnSourceWebpackPlugin([ {
				filename: "index.html",
				type: "js",
				pos: "befor_header",
				src: 'https://cdn.bootcss.com/axios/0.16.2/axios.js',
			}, {
				filename: "index.html",
				type: "js",
				pos: "befor_header",
				src: 'https://cdn.bootcss.com/jquery/1.11.3/jquery.js',
			}
			, {
				filename: "index.html",
				type: "css",
				pos: "befor_header",
				src: 'https://cdn.bootcss.com/bootstrap/4.0.0-beta/css/bootstrap-grid.min.css',
			}
	
			])
		],
	}