const path = require('path'),
    webpack = require('webpack'),
//  ROOT_PATH = path.resolve(__dirname) + "/",
//  OUT_PATH = path.resolve(ROOT_PATH, 'build') + "/",
//  SERVER_PATH = process.env.SERVER || "./build/", // 服务路径
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ip = require('ip').address(),
    port = "8091";
const config = {
    entry: {
        index: "./demo/index.js", //[ROOT_PATH + "\\js\\entrance.js"],
        // 打包第三方库作为公共包
        commons: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../demo/build'),
        publicPath: "/", 
        filename: "build.js"
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
        new ExtractTextPlugin({
			filename: "style.[name].css",
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
            filename: "common.js",
            chunks: ['index'], //提取哪些模块共有的部分
            minChunks: 1
//          minChunks (module) {
//              return module.context && module.context.indexOf('node_modules') >= 0;
//          }
        }),
		// 开启 Scope Hoisting
		new webpack.optimize.ModuleConcatenationPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
}
config.devtool = '#cheap-module-eval-source-map';
config.performance = {
	hints: "warning"
};
config.plugins = (config.plugins || []).concat([
	new (require('friendly-errors-webpack-plugin')),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
]);
// 热替换
Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = [
        `webpack-dev-server/client?http://${ip}:${port}/`,
        "webpack/hot/dev-server"
    ].concat(config.entry[name])
});
var opn = require('opn');
var url = `http://${ip}:${port}/`;
var webpackDevServer = require('webpack-dev-server');
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
	//hot: true,
	quiet: true,
	historyApiFallback: true, //配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
    noInfo: true,
    disableHostCheck: true, // 禁用服务检查
	publicPath: "/" //TODO:必须是output中的publicPath保持一致
});
server.listen(port, ip);
// 打包完毕后启动浏览器
server.middleware.waitUntilValid(function() {
    console.log(`> Listening at ${url}`);
    opn(`${url}`);
});
module.exports = config;