const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const ImageminWebP = require("imagemin-webp");

// const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: "./src/index.js",
  // Where webpack outputs the assets and bundles
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    // assetModuleFilname: "assets/[hash][ext][query]",
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
          from: "./src/images/**/**",
          to: "./images/[name].webp",
        },
      ],
    }),
    new ImageminPlugin(),

    // new ImageminPlugin({
    //   plugins: [ImageminWebP({ quality: 50 })],
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

      //Images: Copy image files to build folder
      {
        test: /\.(png|jpe?g)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash].webp",
        },
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              deleteOriginalAssets: true,
              minimizerOptions: {
                plugins: [["imagemin-webp", { quality: 50 }]],
              },
            },
          },
        ],
      },
      // {
      //   test: /\.svg$/i,
      //   type: "asset/inline",
      //   use: [
      //     {
      //       loader: ImageMinimizerPlugin.loader,
      //       options: {
      //         deleteOriginalAssets: true,
      //         minimizerOptions: {
      //           plugins: ["svgo"],
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.svg$/i,
        type: "asset",
      },
    ],
  },
};
