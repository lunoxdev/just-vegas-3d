const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".js", ".ts"],
  },
  experiments: {
    topLevelAwait: true,
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    static: "./public",
    host: "localhost",
  },
};
