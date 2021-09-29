const webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    static: "./dist",
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});
