import { getGeoLocation } from './geo'
import { get } from './fetch'
import { URLS, NODE_SERVER_ENABLED } from 'src/settings'

// Note: if NODE_SERVER is enabled will use the raw data from NODE API

export const getCurrentCity = () =>
    new Promise( ( resolve, reject ) =>
        getGeoLocation()
            .then( ( { lat, lng } ) =>
                get( URLS.Search, {
                    lattlong: [ lat, lng ].join( ',' )
                } )
            )
            .then( results => {
                const location = results[ 0 ]

                if ( location ) {

                    if ( NODE_SERVER_ENABLED ) {
                        return resolve( location )
                    }

                    const { woeid: id, title } = location

                    return resolve( {
                        id,
                        title
                     } )
                } else {
                    return reject( "Couldn't find your current location" )
                }
            } )
            .catch( reject )
    )

export const getWeather = ( id, date ) =>
    new Promise( ( resolve, reject ) => {
        get( URLS.Location( id, date ) )
            .then( ( results ) => {
                if ( NODE_SERVER_ENABLED ) {
                    return resolve( results )
                }

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
                    windDirection: getWindSector( windDirection )
                } )
            } )
            .catch( reject )
    } )

export const searchLocation = query =>
    new Promise( ( resolve, reject ) => {
        get( URLS.Search, {
            query,
        } )
            .then( results =>
                resolve(
                    NODE_SERVER_ENABLED ? results
                        : results.map( ( { title, woeid: id, } ) => ( {
                            id,
                            title
                        } ) )
                )
            )
            .catch( reject )
    } )

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
export const getWindSector = ( degree ) =>
    WindSectors[ Math.round( ( degree % 360 ) / SectorDegrees ) + 1 ]