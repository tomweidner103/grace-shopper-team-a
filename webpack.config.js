module.exports = {
  // devtool: 'sourcemap',
  entry: [
    // enables async-await
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
};