const { ESLint } = require("eslint");

module.exports = new ESLint({
    baseConfig: {
        parser: "@typescript-eslint/parser",
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended"
        ],
        plugins: ["@typescript-eslint"],
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: "module"
        },
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "no-console": "warn"
        },
        env: {
            node: true,
            es6: true
        }
    }
});
