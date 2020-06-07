const fs = require( "fs" )
const path = require( "path" )
const indexPath = path.resolve( __dirname, "../dist/index.html" )

const renderPage = async ( ctx, next ) => {
    await next()
    ctx.type = 'html'
    ctx.body = fs.createReadStream( indexPath )
}

module.exports = renderPage