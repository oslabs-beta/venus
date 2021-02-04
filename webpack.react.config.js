const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
          options: 
              {  
                plugins: [
                  [
                    "import",
                    {
                      "libraryName": "antd",
                      "style": "index.css"
                    }
                  ]
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
        { loader: "css-loader?modules"},
        { loader: "less-loader",
        options: {
          lessOptions:{
            javascriptEnabled: true
        }
      }
      }
]
      }
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
