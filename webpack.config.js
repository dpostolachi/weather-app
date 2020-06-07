const path = require( 'path' )
const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyPlugin = require( 'copy-webpack-plugin' )

const BE_DOMAIN = 'https://www.metaweather.com'

const {
    NODE_ENV = 'development',
    PORT = 8080,
    NODE_SERVER_ENABLED = false
} = process.env

module.exports = {
    mode: NODE_ENV,
    context: __dirname,
    entry: {
        app: path.resolve( __dirname, 'src/index.js' )
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.resolve( __dirname, 'src/index.html' )
        } ),
        new webpack.DefinePlugin( {
            process: {
              env: {
                NODE_ENV: JSON.stringify( NODE_ENV ),
                NODE_SERVER_ENABLED: JSON.stringify( NODE_SERVER_ENABLED )
              }
            }
          } ),
        new CopyPlugin( {
            patterns: [
                {
                    from: path.resolve( __dirname, 'src/assets' ),
                    to: path.resolve( __dirname, 'dist/assets' )
                }
            ]
        } ),
    ],
    output: {
        publicPath: '/',
        path: path.resolve( __dirname, 'dist' ),
        filename: 'js/[name].bunde.js',
    },
    resolve: {
        alias: {
            src: path.resolve( __dirname, 'src' )
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [ 'babel-loader' ],
            }
        ]
    },
    devServer: {
        port: PORT,
        contentBase: path.join( __dirname, 'dist' ),
        proxy: {
            '/api': {
                target: BE_DOMAIN,
                secure: false,
                changeOrigin: true,
            },
        }
    }
}