module.exports = {
    root: true,
    env: {
        node: true
    },
    plugins: ["vue"],
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        "no-console": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "space-before-function-paren": 0,
        // 缩进使用不做限制
        indent: "off",
        "no-control-regex": 0,
        // 允许使用tab
        "no-tabs": "off",
        "no-unused-vars": "off",
        "max-len": [
            "error",
            {
                code: 1000,
                ignoreUrls: true
            }
        ]
    },
    globals: {
        site: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    overrides: [
        {
            files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
            excludedFiles: "dist/*",
            env: {
                jest: true
            }
        }
    ]
};
