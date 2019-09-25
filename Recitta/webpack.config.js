const path  = require('path')


module.exports = {
   entry: {
      index: ['babel-polyfill', './src/index.js'],
      edit: ['babel-polyfill', './src/edit.js']
   },
   output: {
      path: path.resolve(__dirname,'public/scripts'),
      filename: '[name]-bundle.js'
   },
   module: {
      rules: [{
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader',
            options: {
               presets: ['env']
            }
         }
      }]
   },
   devServer: {
      hot: true,
         inline: true,
         watchOptions: {
            poll: true
         },
      watchContentBase: true,
      contentBase: path.resolve(__dirname, 'public'),
      publicPath: '/scripts/',
      stats: {
            children: false, // Hide children information
            maxModules: 0 // Set the maximum number of modules to be shown
         },
         port: 3001
   },
   devtool: 'source-map'
   
}