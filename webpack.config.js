const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./example/index.html",
  filename: "./index.html",
});

module.exports = {
  entry: "./example/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve("example/dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [htmlPlugin],
};
