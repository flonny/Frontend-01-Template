const path = require('path');

module.exports = {
    mode:"development",
  entry: './main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
  },
  optimization:{
      minimize:false
  },
  module: {
      rules: [
          {
              test: /.js$/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets:["@babel/preset-env"],
                        plugins:[["@babel/plugin-transform-react-jsx"]]
                    }
                }
          }
        ]
  }
};
