module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: process.env.VUE_APP_ENV === "lib" ? "dist" : "demo/build",
    assetsDir: "assets",
    lintOnSave: process.env.NODE_ENV === "development",
    pages: {
        index: {
            entry: "demo/index.js",
            template: "demo/index.html",
            filename: "index.html",
            favicon: "demo/site.ico",
            title: "数字键盘实例"
        }
    },
    css: {
        extract: process.env.VUE_APP_ENV === "lib" || process.env.NODE_ENV === "production" ? true : false
    },
    configureWebpack: config => {
        // config.output = {
        //     libraryExport: 'default'
        // }
        if (process.env.VUE_APP_ENV === "lib") {
            config.externals = {
                vue: "vue"
            };
            config.output.libraryExport = "default";
        }
    },
    chainWebpack: config => {
        if (process.env.VUE_APP_ENV == "lib") {
            // lib 模式删除 HTML 相关的 webpack 插件
            config.plugins.delete("html");
            config.plugins.delete("preload");
            config.plugins.delete("prefetch");
        } else {
            // config.plugin("html").tap(args => {
            //     args[0].favicon = path.resolve("demo/site.ico");
            //     return args;
            // });
        }
    },
    devServer: {
        // host: '0.0.0.0',
        // port: 8100,
        // open: true,
        disableHostCheck: true, // 禁用服务检查
        overlay: {
            warnings: false,
            errors: true
        }
    }
};
