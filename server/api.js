const Router = require( 'koa-router' )
const { searchLocation, getWeather } = require( './utils/weather' )

const router = new Router()

router.get( '/api/search', async ( ctx ) => {
    const {
        query,
        lattlong,
    } = ctx.query

    try {
        ctx.body = await searchLocation( {
            query,
            lattlong
        } )

    } catch( e ) {
        ctx.status = 400
        ctx.body = 'Failed to search for location.'
    }

} )

router.get( '/api/location/:id', async ( ctx ) => {
    const { id } = ctx.params
    const { date } = ctx.query

    try {
        ctx.body = await getWeather( id, new Date( date ) )

    } catch ( e ) {
        ctx.status = 400
        ctx.body = 'Failed to retrieve weather data.'
    }

} )

module.exports = router