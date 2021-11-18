const path = require("path");

const customESLintConfig = require("../.eslintrc.js");
const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\,css&/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [require("tailwindcss"), require("autoprefixer")],
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });
    return config;
  },
};
