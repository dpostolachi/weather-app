const WEATHER_DOMAIN = 'https://www.metaweather.com'

const SEARCH = `${ WEATHER_DOMAIN }/api/location/search/`
const LOCATION = ( id, date ) =>
    `${ WEATHER_DOMAIN }/api/location/${id}/${date}/`

module.exports = {
    SEARCH,
    LOCATION,
}