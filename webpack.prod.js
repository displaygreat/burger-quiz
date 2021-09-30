const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const { merge } = require("webpack-merge");

const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].[contenthash].bundle.js",
    publicPath: "/burger-quiz/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // {
      //   test: /\.(jpe?g|png)$/i,
      //   use: [
      //     {
      //       loader: ImageMinimizerPlugin.loader,
      //       options: {
      //         filename: "images/[name].webp",
      //         minimizerOptions: {
      //           plugins: ["imagemin-webp"],
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
