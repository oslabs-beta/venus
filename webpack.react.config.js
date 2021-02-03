const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let options = {
  "libraryName": "antd",
  "style": true,
}

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".less"],
    mainFields: ["main", "module", "browser"],
  },
  entry: "./src/app.tsx",
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              ['import', { libraryName: "antd", style: true }]
          ]
          }
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
        { loader: "style-loader"},
        { loader: "css-loader"},
        { loader: "less-loader",
        options: {
          lessOptions:{
            javascriptEnabled: true
        }
      }
      }
]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist/renderer"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: "/",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  plugins: [new HtmlWebpackPlugin()],
};
