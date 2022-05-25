const path = require("path"); //require подключает один модуль к другому
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { //module.exports делает модуль доступным для других модулей
  // entry: "./src/index.js",
  mode: 'development',
  entry: {
    index: './src/index.js',
    heroes: './src/partials/heroes-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    fallback: {
        "fs": false
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/
      },
      { test: /\.handlebars/, loader: "handlebars-loader" },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
              loader: "css-loader",
              options: {
                  
              }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
          }
        ]
    },
    {
      test: /\.(jpg|png|gif)$/,
      use: [
          {
              loader: "file-loader",
              options: {
                  name: '[name].[ext]',
                  outputPath: 'static/',
                  useRelativePath: true,
              }
          },
          {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
          }
      ]
      }
    ],
  },
  plugins: [
    // postcssImport,
    // postcssPresetEnv({ stage: 3 }),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-styles.css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: "My awesome service",
      template: "./src/index.handlebars",
    }),
  ],
  stats: {
    children: true,
  },
  devServer: {
    port: 3000,
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};