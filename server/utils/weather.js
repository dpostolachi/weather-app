const { get } = require('./fetch')
const { SEARCH, LOCATION } = require( '../settings' )

const WindSectors = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N'
]

const SectorDegrees = 360 / 16

const getWindSector = ( degree ) =>
    WindSectors[ Math.round( ( degree % 360 ) / SectorDegrees ) + 1 ]

const getWeather = ( id, date ) =>
    new Promise( ( resolve, reject ) => {
        const dateString = `${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }`
        get( LOCATION( id, dateString ) )
            .then( ( results ) => {

                if ( !results.length ) {
                    return reject( 'No weather data found.' )
                }

                const current = results[0]
                const {
                    weather_state_name: condition,
                    weather_state_abbr: icon,
                    min_temp: min,
                    max_temp: max,
                    the_temp: temp,
                    wind_direction: windDirection,
                } = current

                return resolve( {
                    condition,
                    icon,
                    min,
                    max,
                    temp,
                    windDirection: getWindSector( windDirection ),
                } )
            } )
            .catch( reject )
    } )

const searchLocation = params =>
    new Promise( ( resolve, reject ) => {
        get( SEARCH, params )
            .then( data =>
                resolve(
                    data.map( ( { title, woeid: id } ) => ( {
                        id,
                        title
                    } ) )
                )
            )
            .catch( reject )
    } )

module.exports = {
    searchLocation,
    getWeather,
}