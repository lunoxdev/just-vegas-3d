const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public/assets",
          to: "assets",
        },
      ],
    }),
  ],
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
    publicPath: "/",
  },
  devServer: {
    static: "./public",
    host: "localhost",
  },
};
