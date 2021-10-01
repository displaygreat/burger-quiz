const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminWebP = require("imagemin-webp");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: "./src/index.js",
  // Where webpack outputs the assets and bundles
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: "Burger Quiz",
      favicon: "./src/assets/favicon.png",
      template: "./src/template.html", // template file
      filename: "index.html", // output file
    }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images/**/**",
          to: "./images/[name].webp",
        },
      ],
    }),
    new ImageminPlugin({
      plugins: [ImageminWebP({ quality: 75 })],
    }),

    // new ImageMinimizerPlugin({
    //   deleteOriginalAssets: false,
    //   test: /\.(jpe?g|png)$/i,
    //   filename: "[name].webp",
    //   // test: /\.(jpe?g|png|gif|svg)$/i,
    //   // filename: "[path][name].webp",
    //   minimizerOptions: {
    //     plugins: ["imagemin-webp"],
    //   },
    // }),

    // new GoogleFontsPlugin({
    //   fonts: [{ family: "Lato", variants: ["300", "400", "700"] }],
    // }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },

      // Images: Copy image files to build folder
      // {
      //   test: /\.(jpe?g|png)$/i,
      //   use: [
      //     {
      //       loader: ImageMinimizerPlugin.loader,
      //       options: {
      //         deleteOriginalAssets: true,
      //         filename: "[contenthash].webp",
      //         minimizerOptions: {
      //           plugins: ["imagemin-webp"],
      //         },
      //       },
      //     },
      //   ],
      //   type: "asset/resource",
      // },
    ],
  },
};
