const path = require('path'),
    webpack = require('webpack'),
//  ROOT_PATH = path.resolve(__dirname) + "/",
//  OUT_PATH = path.resolve(ROOT_PATH, 'build') + "/",
//  SERVER_PATH = process.env.SERVER || "./build/", // 服务路径
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ip = require('ip').address(),
    CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
    entry: {
        index: "./demo/index.js", //[ROOT_PATH + "\\js\\entrance.js"],
        // 打包第三方库作为公共包
        commons: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../demo/build'),
        publicPath: "./", 
        filename: "build.[hash].js"
    },
    externals: [],
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
            exclude: /^node_modules$/,
            use: {
        		loader: "vue-loader",
        		options: {
        			extractCSS: true,
	            	loaders: {
		                css: ExtractTextPlugin.extract({
		                    fallback: 'vue-style-loader',
			          		use: [
			            		{ loader: 'css-loader'},
			            		{ loader: 'postcss-loader', options: { sourceMap: true } }
			          		],
			          		publicPath: "./"
		                }),
		                less: ExtractTextPlugin.extract({
		                    fallback: 'vue-style-loader',
				          	use: [
				            	{ loader: 'css-loader'},
				            	{ loader: 'postcss-loader', options: { sourceMap: true } },
				            	"less-loader"
				          	],
				          	publicPath: "./"
		                }),
		                scss: ExtractTextPlugin.extract({
		                    fallback: 'vue-style-loader',
			          		use: [
			            		{ loader: 'css-loader'},
			            		{ loader: 'postcss-loader', options: { sourceMap: true } },
			            		'sass-loader'
			          		],
			          		publicPath: "./"
		                }),
	            	}
        		}
    		}
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
            		{ loader: 'css-loader'},
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
	            	{ loader: 'css-loader'},
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
            		{ loader: 'css-loader'},
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
                    name: 'imgs/[name].[hash:7].[ext]',
                    publicPath: "./"
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 5000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }]
        }]
    },
    plugins: [
    	new CleanWebpackPlugin(['demo/build/*'], {root: path.resolve(__dirname, '../'), verbose: true, dry: false}),
        new ExtractTextPlugin({
			filename: "style.[name].[hash].css",
			allChunks: true
		}), //必须要allChunks设置为true,不然webpack编译会报错
        new HtmlWebpackPlugin({
            filename: "index.html", //生成的html存放路径，相对于 path
            template: './demo/index.html', //html模板路径
            favicon: "./demo/site.ico",
            chunks: ['commons', 'index'],
            inject: true, //允许插件修改哪些内容，包括head与body
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false, //删除空白符与换行符
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true
            }
        }),
        /*
              使用CommonsChunkPlugin插件来处理重复代码
              因为vendor.js和index.js都引用了spa-history, 如果不处理的话, 两个文件里都会有spa-history包的代码,
            我们用CommonsChunkPlugin插件来使共同引用的文件只打包进vendor.js
        */
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "common.[hash].js",
            chunks: ['index'], //提取哪些模块共有的部分
            minChunks: 1
//          minChunks (module) {
//              return module.context && module.context.indexOf('node_modules') >= 0;
//          }
        }),
		// 开启 Scope Hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		//显示构建进度
        new webpack.ProgressPlugin(),
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