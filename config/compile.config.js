const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/",
        filename: "vue-number-keyboard.js",
        library: 'vue-number-keyboard',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'link:href']
                }
            }]
        }, {
            test: /\.js(x)*$/,
            exclude: /^node_modules$/,
            use: ['babel-loader']
        }, {
            test: /\.vue$/,
            use: {
        		loader: "vue-loader",
        		options: {
        			extractCSS: true,
	            	loaders: {
		                css: ExtractTextPlugin.extract({
		                    fallback: 'vue-style-loader',
			          		use: [
			            		{ loader: 'css-loader', options: { minimize: true } },
			            		{ loader: 'postcss-loader', options: { sourceMap: true } }
			          		],
			          		publicPath: "./"
		                }),
		                less: ExtractTextPlugin.extract({
		                    fallback: 'vue-style-loader',
				          	use: [
				            	{ loader: 'css-loader', options: { minimize: true } },
				            	{ loader: 'postcss-loader', options: { sourceMap: true } },
				            	"less-loader"
				          	],
				          	publicPath: "./"
		                }),
		                scss: ExtractTextPlugin.extract({
		                    fallback: 'vue-style-loader',
			          		use: [
			            		{ loader: 'css-loader', options: { minimize: true } },
			            		{ loader: 'postcss-loader', options: { sourceMap: true } },
			            		'sass-loader'
			          		],
			          		publicPath: "./"
		                })
	            	}
        		}
    		}
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
            		{ loader: 'css-loader', options: { minimize: true } },
            		{ loader: 'postcss-loader', options: { sourceMap: true } }
          		],
                publicPath: "./"
            })
        }, {
            test: /\.less/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
	            	{ loader: 'css-loader', options: { minimize: true } },
	            	{ loader: 'postcss-loader', options: { sourceMap: true } },
	            	"less-loader"
	          	],
                publicPath: "./"
            })
        }, {
            test: /\.scss/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
            		{ loader: 'css-loader', options: { minimize: true } },
            		{ loader: 'postcss-loader', options: { sourceMap: true } },
            		'sass-loader'
          		],
                publicPath: "./"
            })
        }, {
            test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'imgs/name.[ext]'
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 5000,
                    name: 'fonts/name.[ext]'
                }
            }]
        }]
    },
    devtool: false,
    performance: {
    	hints: false
    },
    plugins: [
    	new CleanWebpackPlugin(['dist/*.*', 'build/*.*'], {root: path.resolve(__dirname, '../'), verbose: true, dry: false}),
        new ExtractTextPlugin({
			filename: "vue-number-keyboard.css",
			allChunks: true
		}), //必须要allChunks设置为true,不然webpack编译会报错
        //显示构建进度
        new webpack.ProgressPlugin(),
		// 开启 Scope Hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
		        warnings: false,
		        screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
		    },
		    output: {
		        comments: false
		    },
			sourceMap: false
		})
    ],
    resolve: {
        extensions: ['.js', '.vue', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
}
module.exports = config;