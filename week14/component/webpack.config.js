const path = require('path')
module.exports = {
    mode:'development',
    entry: './src/main.js',
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader:'babel-loader',
                    options:{
                        presets:["@babel/preset-env"],
                        plugins:[["@babel/plugin-transform-react-jsx",{pragma:"create"}]]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 3000
      }
}