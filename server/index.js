const Koa = require( 'koa' )
const serve = require( 'koa-static' )
const path = require( 'path' )
const api = require( './api' )
const render = require( './render' )
const app = new Koa()

const {
    PORT = 3000
} = process.env


app.use( serve( path.resolve( __dirname, '../dist' ) ) )
app.use( api.routes() )
app.use( api.allowedMethods() )
app.use( render )

app.listen( PORT, () => {
    console.log( `Listening on port: ${ PORT }` )
} )